const prefs = {
  bodybuilding: false,
  parkour: false,
  general: false,
  crossfit: false,
  yoga: false,
  boxing: false,
};

export const prefArrToBoolObj = (prefArr: string[]) => {
  let returnPrefs = { ...prefs };

  prefArr.forEach((ex) => {
    returnPrefs[ex] = true;
  });

  return returnPrefs;
};
