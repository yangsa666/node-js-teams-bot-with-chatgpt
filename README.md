![Teams-logo.png](https://i.ibb.co/KctV4zT/Teams-logo.png) ![Open-AI-logo.png](https://i.ibb.co/R0J7sF8/Open-AI-logo.png)

# Introduction 
A Teams bot to let you chat with ChatGPT on Teams.

# Build and Test

## Prerequisites
1. Install Node.js: [Node.js (nodejs.org)](https://nodejs.org/en/)
2. Install Git: [Git for Windows](https://gitforwindows.org/)
3. Install VS Code: [Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/)
4. Install Azure Function Extension on VSCode
5. Ensure you have a Microsoft 365 account and follow [the Teams development document](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/teams-developer-portal) to register an App with bot feature.
6. Ensure you have an Azure subscription.

## How to run it
1. Clone the project.
2. Open the project folder with VS Code.
3. Raname `local.samplesettings.json` to `local.settings.json`, fill the required information. In this sample, it uses MongoDb to store user's chat history with ChatGPT. If you don't have a MongoDb, you can create one on Azure for test.
4. Open Azure Functions Extension, sign in your Azure subscription account to deploy it and upload settings to Azure Functions App. See more details [here](https://learn.microsoft.com/en-us/azure/developer/javascript/how-to/with-web-app/azure-function-resource-group-management/deploy-azure-function-with-visual-studio-code#use-visual-studio-code-extension-to-deploy-to-hosting-environment).
5. After deploying it, configure the Azure function URL in the Teams bot Endpoint URL in Teams developer portal. 
6. Install or preview the Teams bot app on your teams
7. Enjoy it by saying hello to the bot.