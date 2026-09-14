import assert from "node:assert/strict";
import {
  getGarminRegion,
  getGarminRegionConfig,
} from "../src/garmin-region.js";

const chinaLoginUrl =
  "https://sso.garmin.cn/portal/sso/zh-CN/sign-in?clientId=GarminConnect&service=https://connect.garmin.cn/modern/";

assert.equal(getGarminRegion({}), "cn");
assert.equal(getGarminRegion({ GARMIN_REGION: "cn" }), "cn");
assert.equal(getGarminRegion({ GARMIN_REGION: "global" }), "global");
assert.throws(
  () => getGarminRegion({ GARMIN_REGION: "eu" }),
  /GARMIN_REGION must be exactly cn or global/,
);

assert.deepEqual(getGarminRegionConfig("cn"), {
  loginUrl: chinaLoginUrl,
  activityUrl: "https://connect.garmin.cn/modern/",
  connectOrigin: "https://connect.garmin.cn",
});
assert.deepEqual(getGarminRegionConfig("global"), {
  loginUrl: "https://connect.garmin.com/app/activities",
  activityUrl: "https://connect.garmin.com/app/activities",
  connectOrigin: "https://connect.garmin.com",
});
