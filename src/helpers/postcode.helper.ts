import { AxiosResponse } from "axios";
import { get } from "@src/helpers/apiClient";
import { BASE_URL } from "@src/constants";


/**
 * Fetches postcode information from the Zippopotam.us API.
 * @param country - ISO country code (e.g. "us", "gb").
 * @param postcode - The postcode or zip code to look up.
 * @returns The Axios response and HTTP status code.
 */
export async function getPostcodeByCountry(
  country: string,
  postcode: string
): Promise<{ response: AxiosResponse | undefined; statusCode: number }> {
  return get(`${BASE_URL}/${country}/${postcode}`);
}
