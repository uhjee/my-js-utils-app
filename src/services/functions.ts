import { isEqual, isObject, transform } from 'lodash';

// interface UnknownObject {
//   [key: string | number]: UnknownObject;
// }

// interface ResultObject {
//   [key: string | number]: UnknownObject;
// }

export const getDiffPropsDeepEqual = (
  obj1: Record<keyof any, any>,
  obj2: Record<keyof any, any>,
) => {
  const result: Record<keyof any, any> = {};

  const findDiff = (
    obj1: any,
    obj2: any,
    key?: string,
    result?: Record<keyof any, any>,
  ) => {
    if (isObject(obj1) && isObject(obj2)) {
      const objKeys1 = Object.keys(obj1);

      for (let i = 0; i < objKeys1.length; i++) {
        if (obj2.hasOwnProperty(objKeys1[i])) {
        } else {
        }
      }

      // let objKeys2 = Object.keys(obj2);
      // 1. key 유무 비교
      // const deletedKeyValues = objKeys1
      //   .filter((k) => !obj2.hasOwnProperty(k))
      //   .reduce<Record<keyof any, any>>((acc, k) => {
      //     acc[k] =
      //       isObject((obj1 as Record<keyof any, any>)[k]) &&
      //       isObject((obj2 as Record<keyof any, any>)[k]);
      //     return acc;
      //   }, {});
      // if (deletedKeyValues) result.deleted = deletedKeyValues;
      // result.added = objKeys2
      //   .filter((k) => !obj1.hasOwnProperty(k))
      //   .reduce<Record<keyof any, any>>((acc, cur) => {
      //     acc[cur] = obj2[cur];
      //     return acc;
      //   }, {});
    }
  };

  // 2. value 비교

  return result;
};

// const isObject = (arg: UnknownObject) => {
//   // if(obj === null) return false;
//   // return obj.constructor.name === 'Object';

//   // same above code.
//   return arg !== null && typeof arg === 'object';
// };

// const isArray = (arg: UnknownObject) => Array.isArray(arg);
// // const isArray = (arg: UnknownObject) =>
// //   Object.prototype.toString.call(arg) === '[object Array]';

// const hasOwn = (obj: UnknownObject, key: string) => {
//   return obj.hasOwnProperty(key);
// };

// const isEqual = (val1: UnknownObject, val2: UnknownObject) => {
//   if (isObject(val1) && isObject(val2)) {
//     if (Array.isArray(val1) && Array.isArray(val2)) {
//       if (val1.length !== val2.length) {
//         return false;
//       }
//       // If they dont differ in size, we need to compare all the elements
//       for (let i = 0; i < val1.length; i++) {
//         if (val1[i].toString() !== val2[i].toString()) {
//           return false;
//         }
//       }
//     }
//   } else {
//     // 둘 다 object, array가 아닌 경우
//     if (val1.toString() !== val2.toString()) {
//       return false;
//     }
//   }
//   return true;
// };

// export const getDiffPropsDeepEqual = (next: unknown, prev: unknown) => {
//   function changes(next: any, prev: any) {
//     return transform(
//       next,
//       function (result: Record<keyof any, any>, value, key) {
//         if (!isEqual(value, prev[key])) {
//           result[key] =
//             isObject(value) && isObject(prev[key])
//               ? changes(value, prev[key])
//               : value;
//         }
//       },
//       {},
//     );
//   }
//   return changes(next, prev);
// };
