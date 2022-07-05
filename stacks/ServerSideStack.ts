import path from "path";
import fs from "fs-extra";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { StackContext, Api } from "@serverless-stack/resources";

export function ServerSideStack({ app, stack }: StackContext) {
  if (!app.local) {
    // Create a layer for production
    // This saves shipping Prisma binaries once per function
    const layerPath = ".sst/layers/prisma";

    // Clear out the layer path
    fs.rmSync(layerPath, { force: true, recursive: true });
    fs.mkdirSync(layerPath, { recursive: true });

    // Copy files to the layer
    const toCopy = [
      "node_modules/.prisma",
      "node_modules/@prisma/client",
      "node_modules/prisma/build",
    ];
    for (const file of toCopy) {
      fs.copySync(file, path.join(layerPath, "nodejs", file), {
        // Do not include binary files that aren't for AWS to save space
        filter: (src) => !src.endsWith("so.node") || src.includes("rhel"),
      });
    }
    const prismaLayer = new lambda.LayerVersion(stack, "PrismaLayer", {
      code: lambda.Code.fromAsset(path.resolve(layerPath)),
    });

    // Add to all functions in this stack
    stack.addDefaultFunctionLayers([prismaLayer]);
  }

  const api = new Api(stack, "ServerSide", {
    authorizers: {
      auth0: {
        type: "jwt",
        jwt: {
          audience: [process.env.AUTH0_DOMAIN + "/api/v2/"],
          issuer: process.env.AUTH0_DOMAIN,
        },
      },
    },
    defaults: {
      authorizer: "auth0",
      function: {
        environment: {
          DATABASE_URL: process.env.DATABASE_URL,
          CACHE_URL: process.env.CACHE_URL,
          SENTRY_DSN: process.env.SENTRY_DSN,
        },
        bundle: {
          // Only reference external modules when deployed
          externalModules: app.local ? [] : ["@prisma/client", ".prisma"],
        },
      }
    },
    routes: {
      "GET /private": "functions/private.handler",
      "GET /public": {
        function: "functions/public.handler",
        authorizer: "none",
      },

      "POST /graphql": {
        type: "pothos",
        function: {
          handler: "functions/graphql/graphql.handler",
        },
        schema: "services/functions/graphql/schema.ts",
        output: "graphql/schema.graphql",
        commands: [
          "npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm",
        ],
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return api;
}