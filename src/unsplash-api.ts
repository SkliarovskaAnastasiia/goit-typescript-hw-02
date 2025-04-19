import axios, { AxiosResponse } from 'axios';
import { Image } from './commonTypes';

const ACCESS_KEY = 'EUDSMgx5cTSPVmShqIH0MBrhPUPZudZy9djHifgEtAk';
axios.defaults.baseURL = 'https://api.unsplash.com';

type ImagesByQuery = {
  results: Image[];
  total: number;
  total_pages: number;
};

export const getImagesByQuery = async (
  query: string,
  page: number
): Promise<ImagesByQuery> => {
  const responce = await axios.get('/search/photos', {
    params: {
      client_id: ACCESS_KEY,
      query,
      page,
      per_page: 12,
      orientation: 'landscape',
    },
  });

  return responce.data;
};

export const getDownloadLink = async (link: string): Promise<string> => {
  const responce = await axios.get(link, {
    params: { client_id: ACCESS_KEY },
  });
  return responce.data.url;
};
