import assert from "assert";
import { World, setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";
import { AxiosResponse } from "axios";
import { PostcodeResponse } from "@src/types/postcode.types";

export class ApiWorld extends World {
  response: AxiosResponse<PostcodeResponse> | undefined;
  statusCode: number = 0;

  constructor(options: IWorldOptions) {
    super(options);
  }

  get responseData(): PostcodeResponse {
    assert.ok(this.response != null, "Expected a successful response");
    return this.response.data;
  }
}

setWorldConstructor(ApiWorld);
