import axios from 'axios';
const apiKey = "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"; // FIX: MAKE PRIVATE

const getRecommendation = async (bookQuery, numQuery) => {
    const client = axios.create({
        headers: {
            Authorization: "Bearer " + apiKey,
        },
    });

    const customPrompt = `Generate a list of up to ${numQuery} recommended books that a user might enjoy, based on their interest in ${bookQuery}. Label each book with a sequential number, such as '1.', '2.', and so on. Include a brief description of each book and the author. The format should be as follows: [#. Book Title by Author: Description]`;
    // const testPrompt = "how are you?";

    const params = {
        prompt: customPrompt,
        model: "text-davinci-003",
        max_tokens: 500,
        temperature: 0,
    };

    const result = await client.post(
        "https://api.openai.com/v1/completions", params
      );
    return result.data.choices[0].text;
};

export default getRecommendation;

