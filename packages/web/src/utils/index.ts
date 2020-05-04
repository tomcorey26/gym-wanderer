import { Coords } from '../types/Coords';

export { isObjectEmpty } from './isObjectEmpty';
export { loadScript } from './loadScript';

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const isWithinDistance = (
  point: Coords,
  center: Coords,
  radiusDist: number
) => {
  const distance = radiusDist;

  let withinLong =
    point.lng > center.lng - distance && point.lng < center.lng + distance;
  let withinLat =
    point.lat > center.lat - distance && point.lat < center.lat + distance;

  return withinLong && withinLat;
};

export const mapPrefObjToArray = (obj: any) => {
  if (!obj) return [];
  let arr: string[] = [];
  Object.keys(obj).forEach((key: any) => {
    if (obj[key] === true) {
      arr.push(key);
    }
  });
  return arr;
};

export const deleteEmptyValues = (old: any) => {
  let obj = { ...old };
  Object.keys(obj).forEach((key: any) => {
    if (obj[key] === '') {
      delete obj[key];
    }
  });

  return obj;
};
