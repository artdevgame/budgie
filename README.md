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
- Authentication via [@serverless-stack/lambda](https://github.com/serverless-stack/sst/tree/lambda/packages/lambda)
- MySQL database via [PlanetScale](https://planetscale.com) (used for event storage - "writes")
- ORM via [Kysely](https://koskimas.github.io/kysely)
- Redis caching via [Upstash](https://upstash.com) (used to generate projections - "reads")
- GraphQL (and [Pothos](https://pothos-graphql.dev) for TS schema building) - this is the data access layer from the frontend
- Event bus via [Amazon EventBridge](https://aws.amazon.com/eventbridge), which is used to update projections and to dispatch [Server-Sent Events (SSE)](https://en.wikipedia.org/wiki/Server-sent_events) to help keep the frontend in sync
- Monitoring with [Sentry](https://sentry.io)
- [Tailwind UI](https://tailwindui.com) for the design system, built with [React Native for Web](https://necolas.github.io/react-native-web) to allow the components to be shared between mobile/web.
- Component catalogue / testing with [Storybook](https://storybook.js.org)

## <a name="#env"></a> 🔧 Environment variables

| Name             | Description                                   |
| ---------------- | --------------------------------------------- |
| CACHE_URL        | Location of the Redis cache on Upstash        |
| DATABASE_URL     | Location of the MySQL database on PlanetScale |
| GOOGLE_CLIENT_ID | OIDC key to use Google social login           |
| SENTRY_DSN       | Location of the error/performance logs        |

### 🔌 Running locally

#### Prerequisites

1. Create a database at [PlanetScale](https://planetscale.com) - use [schema.mysql](./schema.mysql)
2. Create a redis cache at [Upstash](https://upstash.com)
3. Create a new OAuth client with [Google](https://console.cloud.google.com/apis/credentials/oauthclient)
4. Create an account with [Sentry](https://sentry.io)
5. Assign the relevant [environment variables](#env) based on the above

#### Spinning up

1. Install dependencies with `npm install`
2. Run the database with `npm run db:start`
3. In another shell, run `npm start` - the first time you do this it will take some time as it sets up the various bits of infrastructure.
4. In another shell, run `npm run web` - this will run the website at http://localhost:3000/

### Design system component library

1. Install dependencies with `npm install`
2. Run `npm run storybook` - Visit http://localhost:6006/ in the browser

## 🌐 Domain setup

I have created a domain outside of the AWS ecosystem, my setup looks like this:

```
Namecheap -> Cloudflare -> AWS
```

Namecheap uses Cloudflare as for DNS, and Cloudflare uses a [CNAME entry to point to the urls created by AWS](https://stackoverflow.com/a/61866193/349755).

Cloudflare provide a free SSL certificate via Let's Encrypt, but to make it work with SST I've requested a public certificate through [AWS Certfificate Manager](https://us-east-1.console.aws.amazon.com/acm/home?region=us-east-1#/certificates/list) (AWM) in the `us-east-1` region.

The certificate uses DNS validation to ensure ownership of the domain.

The reason I'm not using Route 53 as recommended by SST is to avoid the monthly $.50 fee. This is something I would probably reconsider if I wasn't building a hobby project.
