import {
  ApiData,
  GetLinkPreviewData as GetLinkPreviewDataApi,
} from 'apis/linkpreview';
import { ClassNameFunc } from './common-types';

export const classNames: ClassNameFunc = (classes) => {
  return classes.filter(Boolean).join(' ');
};

export const GetLinkPreviewData = async (
  url: string
): Promise<ApiData | undefined> => {
  try {
    const res = await GetLinkPreviewDataApi(url);
    return res;
  } catch (error) {
    console.error('Failed to get link preview info, ERR:: ', error);
  }
};
