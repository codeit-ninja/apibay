# apibay.org

A simple TypeScript wrapper for the [apibay.org](https://apibay.org) API (The Pirate Bay).

## Installation

```bash
npm install apibay.org
# or
pnpm add apibay.org
# or
yarn add apibay.org
```

## Usage

### Setup

```ts
import { createApiBay } from 'apibay.org';

const apibay = createApiBay();
```

With options:

```ts
const apibay = createApiBay({
    baseUrl: 'https://apibay.org', // default, use a mirror if needed
    transform: true,               // validate and transform responses with Zod
});
```

When `transform: true` is set, all responses are validated against Zod schemas and types are coerced (e.g. `added` becomes a `Date`, numeric strings become numbers). If validation fails, an error is thrown.

---

### Search torrents

```ts
const results = await apibay.search({ q: 'ubuntu' });

// with category filter
const results = await apibay.search({ q: 'ubuntu', cat: 300 });
```

### Get top 100

```ts
// All categories
const top100 = await apibay.getTop100('all');

// Specific category
const top100 = await apibay.getTop100('207'); // HD Movies

// Recently added
const recent = await apibay.getRecent();
```

### Get torrent details

```ts
const details = await apibay.getDetails(12345678);

console.log(details.name);
console.log(details.descr);
console.log(details.seeders);
```

### Get torrents by user

```ts
const torrents = await apibay.getByUser('username');

// with pagination
const page2 = await apibay.getByUser('username', 1);
```

### Use a custom base URL (mirror)

```ts
apibay.setBaseUrl('https://piratebay-mirror.example.com');
```

---

## API Reference

| Method | Description |
|---|---|
| `search(payload)` | Search torrents by query and optional category |
| `getTop100(category)` | Get top 100 torrents for a category, `'all'`, or `'recent'` |
| `getRecent()` | Get the 100 most recently added torrents |
| `getDetails(id)` | Get detailed info for a torrent by ID |
| `getByUser(username, page?)` | Get torrents uploaded by a user |
| `getBaseUrl()` | Get the current base URL |
| `setBaseUrl(url)` | Set a custom base URL or mirror |

## Development

```bash
pnpm install
pnpm test
pnpm build
```
