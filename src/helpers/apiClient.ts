import axios, { AxiosResponse } from "axios";
import logger from "./logger";

/**
 * Performs an HTTP GET request and returns the response with its status code.
 * @param url - The full URL to request.
 * @returns The Axios response and HTTP status code. Returns status 0 if no response was received.
 */
export async function get(url: string): Promise<{ response: AxiosResponse | undefined; statusCode: number }> {
  logger.info(`REQUEST GET ${url}`);
  try {
    const response = await axios.get(url);
    logger.info(`RESPONSE ${response.status} ${response.statusText}`);
    logger.debug(`BODY ${JSON.stringify(response.data)}`);
    return { response, statusCode: response.status };
  } catch (error: unknown) {
    let status: number = 0;
    let message: string = "Unknown error";
    if (axios.isAxiosError(error)) {
      if (error.response) {
        status = error.response.status;
      }
      message = error.message;
    }
    logger.warn(`ERROR ${status} - ${message}`);
    return { response: undefined, statusCode: status };
  }
}
