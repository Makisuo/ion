/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "bucket",
      providers: {
        aws: {},
      },
      removalPolicy: input?.stage === "production" ? "retain" : "remove",
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("MyBucket");
    bucket.subscribe({
      events: ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"],
      function: "subscriber.handler",
    });

    return {
      bucket: bucket.name,
    };
  },
});