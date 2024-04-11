export const BG_IMG =
  "https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_medium.jpg";

export const NTFLX_USR =
  "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp";

export const DMMY_DP =
  "https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-rouge.png";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

export const IMG_CDN = "https://image.tmdb.org/t/p/w500/";

export const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;

export const propmtToSend = process.env.REACT_APP_PROMPT;

export const fetchWithProxy = (url, params) => {
  return fetch(`https://proxy.cors.sh/${url}`, {
    ...params,
    headers: {
      ...params.headers,
      "x-cors-api-key": process.env.REACT_APP_CORS,
    },
  });
};

export const fetchFromTmdb = async (url) => {
  let res = null;
  try {
    res = await fetch(url, API_OPTIONS);
  } catch (err) {
    res = await fetchWithProxy(url, API_OPTIONS);
  }
  if (res) return res;
};
