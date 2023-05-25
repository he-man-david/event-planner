import axios from 'axios';

// TODO: organize all these apis and their configs

// TODO: This is duplicate from linkpreview app
export interface ApiData {
  success: boolean;
  result?: SiteData;
  error?: string;
}

interface SiteData {
  url: string;
  title?: string;
  favicon?: string;
  description?: string;
  image?: string;
  author?: string;
  siteName?: string;
  largestImage?: string;
}

const linkpreviewUrl =
  import.meta.env.VITE_LINKPREVIEW_URL ?? 'http://localhost:3003';

const axiosConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

export const GetLinkPreviewData = async (url: string): Promise<ApiData> => {
  try {
    const res = await axios.post(linkpreviewUrl, { url }, axiosConfig);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
