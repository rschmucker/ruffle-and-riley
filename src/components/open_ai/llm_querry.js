/**
 * Implements a helpfer function to handle communication with LLM API.
 */
import { OpenAI } from 'openai';
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import {API_PROVIDER , OPENAI_KEY, OPENAI_MODEL } from '../../env';
import { AZURE_ENDPOINT, AZURE_API_KEY, AZURE_DEPLOYMENT_ID } from '../../env';

const MAX_RETRIES = 3;
const TIMEOUT_MS = 10000;

function checkVariable() {
    if (API_PROVIDER === "openai") {
        if (OPENAI_KEY === "-") {
            alert("Error: Please add your API credentials to src/enj.js");
        }
    } else if (API_PROVIDER === "azure") {
        if (AZURE_ENDPOINT === "-") {
            alert("Error: Please add your API credentials to src/enj.js");
        }
    } else {
        alert("Error: Please add your API credentials to src/enj.js"); 
    }
}
checkVariable();


async function llmQuery(requestData) {
    const retryQuery = async (retryCount = 0) => {
        try {
            if (API_PROVIDER === "openai") {
                const client = new OpenAI.OpenAI({apiKey: OPENAI_KEY, dangerouslyAllowBrowser: true});
                const result = await Promise.race([
                    client.chat.completions.create({messages: requestData, model: OPENAI_MODEL, temperature: 0.0, }),
                    new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), TIMEOUT_MS)),
                ]);
                return result.choices[0].message;
            } else {  // azure
                const client = new OpenAIClient(
                    AZURE_ENDPOINT,
                    new AzureKeyCredential(AZURE_API_KEY)
                );
                const result = await Promise.race([
                    client.getChatCompletions(AZURE_DEPLOYMENT_ID, requestData, { temperature: 0.0 }),
                    new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), TIMEOUT_MS)),
                ]);
                return result.choices[0].message;
            }
        } catch (error) {
            console.error(`Attempt ${retryCount} failed - error: ${error.message}`);
            if (retryCount >= MAX_RETRIES) {
                throw new Error(`Did not find a response after ${MAX_RETRIES} attempts`);
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            return retryQuery(retryCount + 1);
        }
    };
    return retryQuery();
}

export default llmQuery;
