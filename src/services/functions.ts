interface AnyObject {
  [key: string | number]: AnyObject
}

interface ResultObject {
  [key: string | number]: AnyObject
}

export const getDiffPropsDeepEqual = (obj1: AnyObject, obj2: AnyObject) => {
  const result: ResultObject = {};

  let objKeys1 = Object.keys(obj1);
  let objKeys2 = Object.keys(obj2);
  // 1. key 유무 비교
  result.deleted = objKeys1
    .filter((k) => !objKeys2.includes(k))
    .reduce<AnyObject>((acc, cur) => {
      acc[cur] = obj1[cur];
      return acc;
    }, {});

  result.added = objKeys2.filter((k) => !objKeys1.includes(k))
    .reduce<AnyObject>((acc, cur) => {
      acc[cur] = obj2[cur];
      return acc;
    }, {});

  // 2. value 비교

  return result;
}

const isObject = (obj: AnyObject) => {
  return obj !== null && typeof obj === 'object';
}
