// API examples:
// https://random-word-api.herokuapp.com/home
// https://random-word.ryanrk.com/
// https://random-word-api.vercel.app/

// TODO: Split into common 1000, 5000, 10000 words

import axios from 'axios';

type RandomWordResponse = string[]
type RandomWords = string[]

async function fetchRandomWords(minLength: number = 2, maxLength: number = 6, numberOfWords = 1): Promise<RandomWords> {
  const url = `https://random-word-api.herokuapp.com/word?number=${numberOfWords}`;

  try {
    const response = await axios.get<RandomWordResponse>(url);
    if (response.status !== 200)
      throw new Error('Invalid response status. status: ' + response.status);
    if (response.data) {
      console.log('Request response:', response.data)
      return response.data;
    }
    else
      throw new Error('Invalid response data. response: ' + response);
  } catch (error) {
    console.error('Error fetching random word:', error);
    throw error;
  }
}

export {fetchRandomWords};
