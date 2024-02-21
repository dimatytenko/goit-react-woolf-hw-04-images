import axios from 'axios';

import { API_KEY } from 'constants/env';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

export const fetchPhotos = async (query, page) => {
  const res = await instance.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
  return res.data;
};
