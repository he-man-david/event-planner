import { z } from 'zod';

export const UUID = z.string().uuid();

export type Page<T> = {
  content: T[];
  pageInfo: {
    offset: number;
    size: number;
    hasNext: boolean;
    totalCount: number;
  };
};
