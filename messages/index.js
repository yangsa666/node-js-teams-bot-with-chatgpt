// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const {
  CloudAdapter,
  ConfigurationServiceClientCredentialFactory,
  createBotFrameworkAuthenticationFromConfiguration,
} = require('botbuilder');

// This bot's main dialog.
const {ChatGPTBot} = require('./bot.js');

const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
  MicrosoftAppId: process.env.MicrosoftAppId,
  MicrosoftAppPassword: process.env.MicrosoftAppPassword,
  MicrosoftAppTenantId: process.env.MicrosoftAppTenantId,
});
const botFrameworkAuthentication =
  createBotFrameworkAuthenticationFromConfiguration(null, credentialsFactory);

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about how bots work.
const adapter = new CloudAdapter(botFrameworkAuthentication);

// Catch-all for errors.
const onTurnErrorHandler = async (context, error) => {
  // This check writes out errors to console log .vs. app insights.
  // NOTE: In production environment, you should consider logging this to Azure
  //       application insights. See https://aka.ms/bottelemetry for telemetry
  //       configuration instructions.
  console.error(`\n [onTurnError] unhandled error: ${error}`);

  // Send a trace activity, which will be displayed in Bot Framework Emulator
  await context.sendTraceActivity(
      'OnTurnError Trace',
      `${error}`,
      'https://www.botframework.com/schemas/error',
      'TurnError',
  );
};

// Set the onTurnError for the singleton CloudAdapter.
adapter.onTurnError = onTurnErrorHandler;

// Create the main dialog.
const myBot = new ChatGPTBot();

module.exports = async function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  context.log(req);
  await adapter.process(req, context.res, (context) => myBot.run(context));
};
