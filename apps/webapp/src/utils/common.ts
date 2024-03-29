import {
  ApiData,
  GetLinkPreviewData as GetLinkPreviewDataApi,
} from 'apis/linkpreview';
import { ClassNameFunc } from './common-types';
import dayjs from 'utils/day';

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

export const dayjsToFormattedString = (date: dayjs.Dayjs): string => {
  return date.format('MM/DD/YYYY hh:mm A');
};

export const dateToLocalTimeZoneDate = (
  date: Date | dayjs.Dayjs
): dayjs.Dayjs => {
  return dayjs(date).tz(dayjs.tz.guess());
};
