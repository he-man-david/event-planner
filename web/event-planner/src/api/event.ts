import {
  PostEventRequestBody,
  PostEventResponse,
  GetEventResponse,
} from "../../../../backend/types";
import axios from "axios";

const host = process.env.HOST || "http://localhost:8080";
const url = host + "/events";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export const CreateEvent = async (
  req: PostEventRequestBody
): Promise<PostEventResponse | undefined> => {
  try {
    const res = await axios.post(url, req, {
      headers,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const GetEvent = async (
  eventId: string
): Promise<GetEventResponse | undefined> => {
  try {
    const res = await axios.get(url + `/${eventId}`, {
      headers,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
