import { getAllPropertyDescriptors } from '../../../Toolbox/Classes/utils/getAllPropertyDescriptors';

const debug = false;

export default abstract class BaseModel {
  public static buildFromObj(argObj: { [k: string]: unknown }) {
    if (!(typeof argObj === 'object'))
      throw new TypeError('buildFromObj, arg0 must be an Object type');

    const modelToUseIsInstanceOfBaseModel = this.prototype instanceof BaseModel;
    const currentThis = this;
    if (modelToUseIsInstanceOfBaseModel) {
      const newThis = new currentThis(this);
      const propsDescriptors = getAllPropertyDescriptors(newThis);

      debug && console.log('all Props : ', propsDescriptors);

      for (const prop in propsDescriptors) {
        const propDesc = propsDescriptors[prop];
        const { enumerable: isEnumerable } = propDesc;
        const isDataExist = typeof argObj[prop] !== 'undefined';
        const data = argObj[prop];

        if (!isEnumerable) {
          const isSetter = typeof propDesc.set === 'function';
          if (isSetter && isDataExist) {
            debug && console.log('Setter : ', { prop });
            newThis[prop] = data;
            continue;
          } else {
            Object.defineProperty(newThis, prop, propDesc);
            debug && console.log('Method : ', { prop });
            continue;
          }
        }

        if (isEnumerable && isDataExist) {
          debug && console.log('Enum : ', { prop });
          const canBeCalledHasBaseModelChild =
            newThis[prop] && newThis[prop].prototype instanceof BaseModel;
          const canBeCalledHasFunction = typeof newThis[prop] === 'function';
          const canBeCalledHasAnArray =
            canBeCalledHasFunction && propDesc.value === Array;

          if (canBeCalledHasBaseModelChild) {
            Object.defineProperty(newThis, prop, {
              ...propDesc,
              value: newThis[prop].buildFromObj(data),
            });
            continue;
          } else if (canBeCalledHasAnArray) {
            Object.defineProperty(newThis, prop, {
              value: Array(...data),
            });
            continue;
          } else if (canBeCalledHasFunction) {
            try {
              Object.defineProperty(newThis, prop, {
                ...propDesc,
                value: propDesc.value(data),
              });
            } catch (err) {
              Object.defineProperty(newThis, prop, {
                ...propDesc,
                value: undefined,
              });
            }
            continue;
          } else {
            Object.defineProperty(newThis, prop, {
              ...propDesc,
              value: data,
            });
            continue;
          }
        }
      }
      return newThis;
    }

    return;
  }
}
