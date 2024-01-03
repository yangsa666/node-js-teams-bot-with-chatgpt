![Teams-logo.png](https://i.ibb.co/KctV4zT/Teams-logo.png) ![Open-AI-logo.png](https://i.ibb.co/R0J7sF8/Open-AI-logo.png)

# Introduction 
A Teams bot to let you chat with ChatGPT on Teams.

# Build and Test

## Prerequisites
1. Install Node.js: [Node.js (nodejs.org)](https://nodejs.org/en/)
2. Install Git: [Git for Windows](https://gitforwindows.org/)
3. Install VS Code: [Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/)
4. Install Azure Function Extension on VSCode
   In VSCode, go to extensions and search Azure Function to isntall it:
   ![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/27b4eefe-e7fd-4933-a7ed-67e82b80ddbf)
6. Ensure you have a Microsoft 365 account and follow [the Teams development document](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/teams-developer-portal) to register an App with bot feature.

  ![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/6e944f80-73ce-4fba-b32a-5dac4705d617)
  Ensure the below permissions are set and you can add a command to allow users to delete chat history.
  ![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/86e16a52-6e9c-4e75-856f-b8b5086a3f9b)
  Please note the bot id and create a client secret which will be used in later.
  
  Bot Id/MicrosoftAppId
  You can go to Tools in Teams Developer portal to find the bot you created. 
  ![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/bca1abe0-c808-4648-a0f5-9bba0bc145ef)

  Client Secret/MicrosoftAppPassword
  And create a new client secret.
  ![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/87a88231-8502-49d0-903f-2cd91c51b4bf)

7. Ensure you have an Azure subscription to create these resources in one resource group:
   - Azure OpenAI resource and deployments: https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource?pivots=web-portal
   - Azure Storage account: https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
   - Azure CosmosDB for Mongo: https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/quickstart-dotnet?tabs=azure-portal%2Cwindows#create-an-azure-cosmos-db-account

## How to run it
1. Open Terminal and clone the project: `git clone https://github.com/yangsa666/node-js-teams-bot-with-chatgpt.git`.
2. Open the project folder with VS Code.

   <img width="650" alt="image" src="https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/2e78f3b3-5d2d-4002-a7fb-6d0dd5ba7904">

4. Raname `local.samplesettings.json` to `local.settings.json`, fill the required information. In this sample, it uses MongoDb to store user's chat history with ChatGPT. If you don't have a MongoDb, you can create one on Azure for test.

   ![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/d0b229d4-00e7-4b59-833c-a7e29bcf3193)
   ![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/5f727194-df41-4f1a-aa3a-87c7977171f2)

`AzureWebJobsStorage`: Azure storage account connection string. Create a storage account in Azure Portal and go to Access Key to copy a connection string.
![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/15442152-ff60-45ed-9fff-435e2319aa0f)

`MicrosoftAppTenantId`: Your Azure AD / MIcrosoft Entra Tenant ID.

`MicrosoftAppId`: Bot Id of the bot you created previously.

`MicrosoftAppPassword`: Client secret of the bot you created previously.

`AZURE_API_KEY`: Your Azure OpenAI resource API key.

`AZURE_ENDPOINT`: Your Azure OpenAI endpoint

You can copy Azure OpenAI key and endpoint from `Keys and Endoint` like below: 
![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/08dbd637-4443-40a3-9127-e0208bef66b8)

`AZURE_DEPLOYMENT_NAME`: Your Azure OpenAI deployment name.
You can go to your Azure OpenAI resource > Model deployment > Manage deployment > create or find an existing deployment.
![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/f473e215-a612-4dff-99fe-ea46afa2b807)

In the below sample, the deployment name is `gpt35turbo`.
![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/6bdf7486-1ba8-4e2a-8075-112b9aa0e629)

`MongoDb_Connection_String`: The connectionstring of the Azure CosmosDB for Mongo you created previously.
![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/792939e9-f6d1-4ad0-b948-182c0307b9b1)


7. Open Azure Functions Extension, sign in your Azure subscription account to deploy it in the resource group you created before and upload settings to Azure Functions App. See more details [here](https://learn.microsoft.com/en-us/azure/developer/javascript/how-to/with-web-app/azure-function-resource-group-management/deploy-azure-function-with-visual-studio-code#use-visual-studio-code-extension-to-deploy-to-hosting-environment).

   **!!!Note!!!**
      If you're using Azure Open AI API, please switch to `AzureOpenAIStack` branch. You can switch branch via the steps below in VSCode.

   ![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/f48b9f0e-e6f4-4ffc-985e-731ca0e50c04)

   ![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/85043635-f52c-4620-b221-e281166d4e60)

9. After deploying it, configure the Azure function URL in the Teams bot Endpoint URL in Teams developer portal.
    You can get Azure Function URL by going to Azure Portal, locate your function app you created in the steps above. Then go to messages function, click `Get Function Url` button.
   ![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/698ba6fd-b0aa-4499-bcc0-9471c24bbc6d)

   Then you can go back to Teams Developer portal > Tools > find the bot you created > Configure. In the endpoint address field, fill the Azure Function Url you got. NOTE: Please remove `?` in the endpoint address.
   ![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/6b53fa8d-551c-4b64-b6bd-c09c669b7bf2)


11. Install or preview the Teams bot app on your teams
    To export the installation package, you can go to Teams Developer portal > locate your app > Publish > Download the app package.
    ![image](https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/f75c5589-dabd-45e8-9afa-63b5a937b72e)

    Then you can go to Teams to upload this as a custom app. Reference: https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/apps-upload
    
13. Enjoy it by saying hello to the bot.

    <img width="1017" alt="image" src="https://github.com/yangsa666/node-js-teams-bot-with-chatgpt/assets/31430559/c67d06cc-2dd4-4183-97fe-8c91991e506c">
