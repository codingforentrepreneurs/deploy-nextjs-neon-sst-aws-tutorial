import { SSTConfig } from "sst";
import { Config, NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "leads-landing",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const DATABASE_URL = new Config.Secret(stack, "DATABASE_URL")
      const SECRET_VAL = new Config.Secret(stack, "SECRET_VAL")
      const site = new NextjsSite(stack, "site", {
        bind: [DATABASE_URL, SECRET_VAL],
      });
      

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
