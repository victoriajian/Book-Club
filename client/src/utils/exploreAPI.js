import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const client = axios.create({
    headers: {
        Authorization: "Bearer " + apiKey,
    },
});

const exploreBooks = async (bookQuery) => {
    const customPrompt = `recommend me 3 books based on my interest in ${bookQuery}. don't include ${bookQuery}. list the results in the format of a json array, ["title": title, "author": author, "description": very brief summary]`;
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

const explorePreferences = async (genreQuery, typeQuery, featureQuery) => {
    const customPrompt = `recommend me 3 books based on my interest in ${genreQuery} genres, ${typeQuery} styles, and ${featureQuery}. list the results in the format of a json array, ["title": title, "author": author, "description": very brief summary].`;

    const params = {
        prompt: customPrompt,
        model: "text-davinci-003",
        max_tokens: 800,
        temperature: 0,
    };

    const result = await client.post(
        "https://api.openai.com/v1/completions", params
      );
    return result.data.choices[0].text;
}

const getCoverImage = async (book) => {
    const title = book.title.replace(/ /g, '+');
    const author = book.author.replace(/ /g, '+');
    const APIResponse = await fetch(`https://api.bookcover.longitood.com/bookcover?book_title=${title}&author_name=${author}`);
    const coverUrl = await APIResponse.json();
    return coverUrl.url;
}

export {
    exploreBooks,
    explorePreferences,
    getCoverImage
};