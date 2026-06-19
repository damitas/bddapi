# BDD API Test Suite

Automated BDD test suite for the [Zippopotam.us](https://api.zippopotam.us) postcode API, covering US and Great Britain as per the backlog requirement.

**Stack:** TypeScript · Cucumber · Axios · Zod

---

## Prerequisites

- Node.js 24+
- npm

---

## Installation

```bash
npm ci
```

---

## Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Full suite |
| `npm run test:ci` | Full suite |
| `npm run test:smoke` | Verify core functionality  |
| `npm run test:negative` | Negative path tests |
| `npm run test:contract` | Data contract validation only |
| `npm run test:bug` | Known defects only |

### Viewing the report

After any test run, open the HTML report in your browser:

```bash
npm run report
```

Reports are written to `reports/report.html` and `reports/report.json`.

---

## Linting

| Command | Description |
|---------|-------------|
| `npm run lint` | Check for linting errors |
| `npm run lint:fix` | Auto-fix linting errors |

---

## Running with Docker

```bash
docker build -t bddapi .
docker run bddapi
```

To extract reports after a run:

```bash
docker run --name bddapi-run bddapi
docker cp bddapi-run:/app/reports ./reports
docker rm bddapi-run
```
---

## Tags

| Tag | Purpose |
|-----|---------|
| `@smoke` | Quick sanity check after a deploy |
| `@negative` | Error handling and 4xx scenarios |
| `@contract` | Data contract / schema validation |
| `@bug` | Known defects pending dev fix |

Run a specific tag:

```bash
npx cucumber-js --tags @smoke
```

---

## Known Issues

The API returns `200` for countries outside the permitted scope (e.g. `fr`, `de`, `au`). Per the backlog, only `us` and `gb` should be accessible. These scenarios are tagged `@bug`.
