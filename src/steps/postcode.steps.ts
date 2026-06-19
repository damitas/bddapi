import { When, Then, DataTable } from "@cucumber/cucumber";
import assert from "assert";
import { getPostcodeByCountry } from "@src/helpers/postcode.helper";
import { ApiWorld } from "@src/support/world";
import { PostcodeResponseSchema } from "@src/types/postcode.types";

When("I request postcode information for {string} and {string}",
  async function (this: ApiWorld, country: string, postcode: string) {
    ({ response: this.response, statusCode: this.statusCode } = await getPostcodeByCountry(country, postcode));
  }
);

When("I successfully request country and postcode information for {string} and {string}",
  async function (this: ApiWorld, country: string, postcode: string) {
    ({ response: this.response, statusCode: this.statusCode } =
      await getPostcodeByCountry(country, postcode));
    assert.strictEqual(this.statusCode, 200, "Expected a 200 response");
  }
);

Then("the response status should be {int}", function (this: ApiWorld, expectedStatus: number) {
  assert.strictEqual(this.statusCode, expectedStatus);
});

Then("the response country abbreviation should be {string}",
  function (this: ApiWorld, expectedAbbr: string) {
    assert.strictEqual(this.responseData["country abbreviation"], expectedAbbr);
  }
);

Then("the response should include at least one place", function (this: ApiWorld) {
  const places = this.responseData["places"];
  assert.ok(Array.isArray(places) && places.length > 0, "Expected places array");
});

Then("the response should include more than one place", function (this: ApiWorld) {
  const places = this.responseData["places"];
  assert.ok(Array.isArray(places) && places.length > 1, "Expected more than one place");
});

Then("the first place should match:", function (this: ApiWorld, table: DataTable) {
  const place = this.responseData.places[0];
  const expected = table.rowsHash() as Record<string, string>;
  for (const [key, value] of Object.entries(expected)) {
    assert.strictEqual(String(place[key as keyof typeof place]), value, `Mismatch on field "${key}"`);
  }
});

Then("the response body should conform to the postcode data contract", function (this: ApiWorld) {
  PostcodeResponseSchema.parse(this.responseData);
});
