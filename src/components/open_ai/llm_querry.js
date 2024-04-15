/**
 * Implements a helpfer function to handle communication with LLM API.
 */
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { AZURE_ENDPOINT, AZURE_API_KEY, AZURE_DEPLOYMENT_ID } from '../../env';

const MAX_RETRIES = 3;
const TIMEOUT_MS = 10000;

function checkVariable() {
    if (AZURE_ENDPOINT === "-") {
        alert("Error: Please add your API credentials to src/enj.js");
    }
}
checkVariable();


const client = new OpenAIClient(
  AZURE_ENDPOINT,
  new AzureKeyCredential(AZURE_API_KEY)
);


async function llmQuery(requestData) {
    const retryQuery = async (retryCount = 0) => {
        try {
            const result = await Promise.race([
                client.getChatCompletions(AZURE_DEPLOYMENT_ID, requestData, { temperature: 0.0 }),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), TIMEOUT_MS)),
            ]);
            return result.choices[0].message;
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
