Feature: Postcode API
  As a 3rd party Developer
  I am able to access the API and retrieve postcode information for the US and Great Britain only

  @smoke
  Scenario Outline: Valid country and postcode returns location
    When I successfully request country and postcode information for "<country>" and "<postcode>"
    Then the response country abbreviation should be "<countryAbbr>"
    And the response should include at least one place

    Examples:
      | country | postcode | countryAbbr |
      | us      | 90210    | US          |
      | gb      | SW1A     | GB          |


  Scenario: Valid country and postcode returns place in correct format
    When I successfully request country and postcode information for "us" and "90210"
    Then the first place should match:
      | place name         | Beverly Hills |
      | longitude          | -118.4065     |
      | latitude           | 34.0901       |
      | state              | California    |
      | state abbreviation | CA            |

  @negative
  Scenario Outline: Invalid postcode for a specific country returns not found
    When I request postcode information for "<country>" and "<postcode>"
    Then the response status should be 404

    Examples:
      | country | postcode |
      | us      | 00000    |
      | gb      | ZZ99     |

  @negative
  Scenario: Invalid country code returns not found
    When I request postcode information for "xx" and "12345"
    Then the response status should be 404

  # TODO: ask devs, should this be 403, 404, or 401 (unauthorised, forbidden, does not exist or malformed?)
  @negative @bug
  Scenario: Country outside permitted scope returns not found
    When I request postcode information for "fr" and "75001"
    Then the response status should be 404

  Scenario Outline: Country code lookup is case insensitive
    When I successfully request country and postcode information for "<country>" and "<postcode>"
    Then the response country abbreviation should be "<countryAbbr>"

    Examples:
      | country | postcode | countryAbbr |
      | uS      | 90210    | US          |
      | Gb      | Sw1A     | GB          |

  Scenario: Postcode mapped to multiple places returns all locations
    When I successfully request country and postcode information for "gb" and "BN1"
    Then the response should include more than one place

  @negative
  Scenario: Request with missing postcode returns not found
    When I request postcode information for "us" and ""
    Then the response status should be 404

  @negative
  Scenario Outline: Malformed postcode format returns not found
    When I request postcode information for "<country>" and "<postcode>"
    Then the response status should be 404

    Examples:
      | country | postcode | note                        |
      | gb      | BN-1     | hyphen in postcode          |
      | gb      | BN 1     | space in postcode           |
      | us      | 902-10   | hyphen in zip code          |
      | us      | 9021O    | letter O instead of zero    |

  @contract
  Scenario: Postcode response conforms to the data contract
    When I successfully request country and postcode information for "us" and "90210"
    Then the response body should conform to the postcode data contract
