export type GarminRegion = "cn" | "global";

export interface GarminRegionConfig {
  loginUrl: string;
  activityUrl: string;
  connectOrigin: string;
}

const REGION_CONFIG: Record<GarminRegion, GarminRegionConfig> = {
  cn: {
    loginUrl:
      "https://sso.garmin.cn/portal/sso/zh-CN/sign-in?clientId=GarminConnect&service=https://connect.garmin.cn/modern/",
    activityUrl: "https://connect.garmin.cn/modern/",
    connectOrigin: "https://connect.garmin.cn",
  },
  global: {
    loginUrl: "https://connect.garmin.com/app/activities",
    activityUrl: "https://connect.garmin.com/app/activities",
    connectOrigin: "https://connect.garmin.com",
  },
};

export function getGarminRegion(
  env: Record<string, string | undefined> = process.env
): GarminRegion {
  const region = env.GARMIN_REGION?.trim().toLowerCase() || "cn";
  if (region !== "cn" && region !== "global") {
    throw new Error("GARMIN_REGION must be exactly cn or global");
  }
  return region;
}

export function getGarminRegionConfig(
  region: GarminRegion = getGarminRegion()
): GarminRegionConfig {
  return REGION_CONFIG[region];
}
