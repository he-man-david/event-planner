import { Request, Response } from 'express';
import { scrapeSite, SiteData, ScrapeOptions } from './scrape';

export interface ApiData {
  success: boolean;
  result?: SiteData;
  error?: string;
}

const handler = async (req: Request, res: Response<ApiData>) => {
  const { url } = req.body;
  const scrapeOptions: ScrapeOptions | undefined = {
    scrape: true,
    stealth: true,
  };
  const { data, errors } = await scrapeSite(url, scrapeOptions);
  if (data) {
    res.send({ success: true, result: data });
  } else {
    res
      .status(400)
      .send({ success: false, result: data, error: JSON.stringify(errors) });
  }
};

export default handler;
