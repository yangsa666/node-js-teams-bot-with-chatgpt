// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
const {
  ActivityHandler,
  TurnContext,
  MessageFactory,
  ActivityTypes,
} = require('botbuilder');
const {Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const {insertChatHistory, deleteChatHistory} = require('../database');

/**
 * A calss to export ChatGPTBot
 */
class ChatGPTBot extends ActivityHandler {
  /**
   * A constructor
   */
  constructor() {
    super();
    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    this.onMessage(async (context, next) => {
      /*
        Todo:
        Supports retrieving channels hosted by a team.
        const channels = await TurnContext.getTeamChannels(context);
        Sends a message activity to the sender of the incoming activity.
        await context.sendActivity(`The channel count is: ${channels.length}`);
      */

      // send bot typing indicator before replying message
      await context.sendActivities([
        {type: ActivityTypes.Typing},
        // {type: 'delay', value: 1000},
      ]);

      // Check if recipent is the Bot, do not reply if not
      const botName = 'ChatGPTBot';
      const recipientName = context.activity.recipient.name;
      if (recipientName !== botName) {
        console.log('Not sent to bot in the message');
        return;
      }

      const sender = context.activity.from;
      const userAadObjectId = sender.aadObjectId;
      const removedMentionText = TurnContext.removeRecipientMention(
          context.activity,
      );
      if (removedMentionText) {
        // Remove the line break
        const txt = removedMentionText
            .toLowerCase()
            .replace(/\n|\r/g, '')
            .trim();
        // Check if txt is a command and run the command function accordingly
        const commandActions = {
          '/deletehistory': async () =>
            await deleteChatHistory(userAadObjectId),
        };
        if (commandActions[txt]) {
          await commandActions[txt]();
          await context.sendActivity(`Executed command '${txt}' successfully`);
          return;
        }
        const userMessage = {role: 'user', content: txt};
        // create chat history and call openai api to get response
        const chatHistoryLength = Number(process.env.Chat_History_Length) * 2;
        const messages = await insertChatHistory(
            userAadObjectId,
            userMessage,
            chatHistoryLength,
        );
        const response = await openai.createChatCompletion({
          model: process.env.OpenAI_MODEL,
          messages,
          user: userAadObjectId,
          // max_tokens: 1000,
        });
        const assistantMessage = response.data.choices[0].message;
        await context.sendActivity(assistantMessage.content);
        await insertChatHistory(
            userAadObjectId,
            assistantMessage,
            chatHistoryLength,
        );
      }
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const conferenceReference = TurnContext.getConversationReference(
          context.activity,
      );
      console.log(conferenceReference);
      const membersAdded = context.activity.membersAdded;
      const welcomeText = 'Hello and welcome to use ChatGPTBot!';
      for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          await context.sendActivity(
              MessageFactory.text(welcomeText, welcomeText),
          );
        }
      }
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}

module.exports.ChatGPTBot = ChatGPTBot;
