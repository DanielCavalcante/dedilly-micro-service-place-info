export type DailyInfo = {
  time: Date;
  temperature2mMinVHR4: number;
  temperature2mMeanVHR4: number;
  temperature2mMaxVHR4: number;
  windspeed10mMeanVHR4: number;
  windspeed10mMaxVHR4: number;
};

export type PlaceInfo = {
  city: string;
  description?: string;
  region?: string;
  state?: string;
  country?: string;
  latitude?: string;
  longitute?: string;
  timestamp?: string;
  timezone?: string;
  dailies?: DailyInfo[];
};
