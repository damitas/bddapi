import assert from "assert";
import { World, setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";
import { AxiosResponse } from "axios";
import { PostcodeResponse } from "@src/types/postcode.types";

/** Shared Cucumber world — holds the HTTP response and status code between When and Then steps. */
export class ApiWorld extends World {
  /** The last Axios response received, undefined if the request failed with no response. */
  response: AxiosResponse<PostcodeResponse> | undefined;

  /** HTTP status code from the last request, 0 if no response was received. */
  statusCode: number = 0;

  constructor(options: IWorldOptions) {
    super(options);
  }

  /** Returns the typed response body, asserting a response was received. */
  get responseData(): PostcodeResponse {
    assert.ok(this.response != null, "Expected a successful response");
    return this.response.data;
  }
}

setWorldConstructor(ApiWorld);
