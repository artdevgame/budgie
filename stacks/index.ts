import { App } from "@serverless-stack/resources";
import { ClientSideStack } from "./ClientSideStack";
import { ServerSideStack } from "./ServerSideStack";

export default function main(app: App) {
  app.setDefaultFunctionProps({
    bundle: {
      format: "esm",
    },
    runtime: "nodejs16.x",
    srcPath: "services",
  });
  app
    .stack(ServerSideStack)
    .stack(ClientSideStack)
}
