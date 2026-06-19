import { AxiosResponse } from "axios";
import { get } from "@src/helpers/apiClient";
import { BASE_URL } from "@src/constants";


export async function getPostcodeByCountry(
  country: string,
  postcode: string
): Promise<{ response: AxiosResponse | undefined; statusCode: number }> {
  return get(`${BASE_URL}/${country}/${postcode}`);
}
