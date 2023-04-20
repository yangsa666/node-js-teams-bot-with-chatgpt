const {MongoClient} = require('mongodb');
const connectionString = process.env.MongoDb_Connection_String;
const client = new MongoClient(connectionString);
const database = client.db('chatgptbot');

/**
 * getChatHistory Description
 * @param {String} user string
 */
async function getChatHistory(user) {
  const collection = database.collection('chathistory');
  const chatHistory = await collection.findOne({user: user});
  if (!chatHistory) {
    return null;
  }
  return chatHistory.messages;
}

/**
 * setChatHistory Description
 * @param {String} user string
 * @param {Object} messages object
 */
async function setChatHistory(user, messages) {
  const collection = database.collection('chathistory');
  const chatHistory = await collection.findOneAndUpdate(
      {user: user},
      {$set: {messages: messages}},
  );
  return chatHistory.txt;
}

/**
 * insertChatHistory Description
 * @param {String} user string
 * @param {Object} message object
 * @param {Number} length number
 */
async function insertChatHistory(user, message, length) {
  const chatHistory = await getChatHistory(user);
  if (!chatHistory) {
    const collection = database.collection('chathistory');
    await collection.insertOne({user: user, messages: [message]});
    return [message];
  }
  chatHistory.push(message);
  if (chatHistory.length > length) {
    chatHistory.shift();
  }
  // const newTxt = chatHistory.join("\n");
  await setChatHistory(user, chatHistory);
  return chatHistory;
}

/**
 * getChatHistory Description
 * @param {String} user string
 */
async function deleteChatHistory(user) {
  const collection = database.collection('chathistory');
  const result = await collection.findOneAndReplace(
      {user: user},
      {
        user: user,
        messages: [],
      },
  );
  return result;
}

module.exports = {
  insertChatHistory,
  deleteChatHistory,
};
