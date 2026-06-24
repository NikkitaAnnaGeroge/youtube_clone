// src/youtubeApi.js
const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  method: 'GET',
  headers: {
    // ⬇️ Replace PASTE_YOUR_KEY_HERE with your actual secret key string
    'x-rapidapi-key': 'd8fb033431msh67ea68268e5538ap113093jsn743afbd4b72e', 
    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchFromAPI = async (url) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, options);
    if (!response.ok) throw new Error('API Request Failed');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("RapidAPI Connection Error:", error);
    return null;
  }
};