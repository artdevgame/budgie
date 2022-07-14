# 🐦 Budgie

A simple personal budgeting tool, inspired by [YNAB](https://www.youneedabudget.com/).

## Why?

I love YNAB and have used the desktop version for years. At some point in the past they moved their business model over to a subscription service. I didn't see the value of switching as I had all the features I required in their original version.

The only 'issue' I had was the data syncing between different devices, which predominantly used Dropbox. I used to have several services using Dropbox, so I didn't think too much about using it, but over time I have migrated away from the platform and it just became another redundant app.

By disconnecting YNAB from Dropbox, I could only use the app on my Windows computer, which is inconvenient as I spend most of my time on other devices nowadays.

With this in mind, and as I was looking to expand my knowledge of serverless & other tech, I thought it was an ideal product to replicate.

## 🧠 Patterns

- Domain Driven Design (DDD)
- Event Sourcing
- Command Query Responsibility Segregation (CQRS)

Here's a [primer video](https://www.youtube.com/watch?v=rolfJR9ERxo) on the theory & practice to get started.

## 🧰 Toolbox

- Serverless via [SST](https://sst.dev) (based on `create-sst`)
- Authentication via [Auth0](https://auth0.com)
- MySQL database via [PlanetScale](https://planetscale.com) (used for event storage - "writes")
- ORM via [Prisma](https://prisma.io) (might change this to [Kysely](https://koskimas.github.io/kysely) eventually)
- Redis caching via [Upstash](https://upstash.com) (used to generate projections - "reads")
- GraphQL (and [Pothos](https://pothos-graphql.dev) for TS schema building) - this is the data access layer from the frontend
- Event bus via [Amazon EventBridge](https://aws.amazon.com/eventbridge), which is used to update projections and to dispatch [Server-Sent Events (SSE)](https://en.wikipedia.org/wiki/Server-sent_events) to help keep the frontend in sync
- Monitoring with [Sentry](https://sentry.io)
- [Tailwind UI](https://tailwindui.com) for the design system, built with [React Native for Web](https://necolas.github.io/react-native-web) to allow the components to be shared between mobile/web.
- Component catalogue / testing with [Storybook](https://storybook.js.org)

## 🔧 Environment variables

| Name            | Description                                   |
| --------------- | --------------------------------------------- |
| AUTH0_CLIENT_ID | Auth0 client id                               |
| AUTH0_DOMAIN    | Auth0 domain                                  |
| CACHE_URL       | Location of the Redis cache on Upstash        |
| DATABASE_URL    | Location of the MySQL database on PlanetScale |
| SENTRY_DSN      | Location of the error/performance logs        |
