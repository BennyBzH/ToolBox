import { getAllPropertyDescriptors } from '../utils/getAllPropertyDescriptors';

type DefaultRecord = Record<string, unknown>;
type DescriptorRecord = Record<string, PropertyDescriptor>;

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type GetEnumerableFromInstance<T> = <
  K extends Pick<T, keyof NonFunctionProperties<T>>
>() => {
  [P in keyof K]?: string | Array<number | string>;
};

export default abstract class AdvenceModel {
  private static getAllMethods(propsDesc: DescriptorRecord): DescriptorRecord {
    const listMethods: DescriptorRecord = {};

    for (const prop in propsDesc) {
      const propDesc = propsDesc[prop];
      if (!propDesc.enumerable && typeof propDesc.set === 'undefined') {
        listMethods[prop] = propDesc;
      }
    }

    return listMethods;
  }

  private static getAllSetters(propsDesc: DescriptorRecord): DescriptorRecord {
    const listSetters: DescriptorRecord = {};

    for (const prop in propsDesc) {
      const propDesc = propsDesc[prop];
      if (propDesc.set && typeof propDesc.set === 'function') {
        listSetters[prop] = propDesc;
      }
    }

    return listSetters;
  }

  private static getBasicEnumerables(
    propsDesc: DescriptorRecord
  ): DescriptorRecord {
    const listEnums: DescriptorRecord = {};

    for (const prop in propsDesc) {
      const propDesc = propsDesc[prop];
      if (
        propDesc.enumerable &&
        !(propDesc.value && typeof propDesc.value === 'function')
      ) {
        listEnums[prop] = propDesc;
      }
    }

    return listEnums;
  }

  private static getEnumerablesHasFunction(
    propsDesc: DescriptorRecord
  ): DescriptorRecord {
    const listEnums: DescriptorRecord = {};

    for (const prop in propsDesc) {
      const propDesc = propsDesc[prop];
      if (
        propDesc.enumerable &&
        propDesc.value &&
        typeof propDesc.value === 'function' &&
        typeof propDesc.value.prototype === 'undefined'
      ) {
        listEnums[prop] = propDesc;
      }
    }

    return listEnums;
  }

  private static getEnumerablesHasProtoAdvenceModel(
    propsDesc: DescriptorRecord
  ): DescriptorRecord {
    const listEnums: DescriptorRecord = {};

    for (const prop in propsDesc) {
      const propDesc = propsDesc[prop];
      if (
        propDesc.enumerable &&
        propDesc.value &&
        typeof propDesc.value === 'function' &&
        propDesc.value.prototype &&
        propDesc.value.prototype instanceof AdvenceModel
      ) {
        listEnums[prop] = propDesc;
      }
    }

    return listEnums;
  }

  private static defineProperty(
    target: any,
    prop: string,
    propDesc: PropertyDescriptor,
    value: any
  ) {
    Object.defineProperty(target, prop, {
      ...propDesc,
      value,
    });
  }

  static buildFromObj<T extends AdvenceModel>(
    this: { new (): T },
    argObj: DefaultRecord,
    remapper?: GetEnumerableFromInstance<T>
  ): T {
    const modelToUse = this;
    const newThis = new modelToUse();
    const propsDescriptors = getAllPropertyDescriptors(newThis);
    console.log({ propsDescriptors, newThis });
    const methods = AdvenceModel.getAllMethods(propsDescriptors);
    const setters = AdvenceModel.getAllSetters(propsDescriptors);
    const enumsBasic = AdvenceModel.getBasicEnumerables(propsDescriptors);
    const enumsFunction =
      AdvenceModel.getEnumerablesHasFunction(propsDescriptors);
    const enumsAdvenceModel =
      AdvenceModel.getEnumerablesHasProtoAdvenceModel(propsDescriptors);
    const { $schema, ...otherMethods } = methods;
    const reservedMethods = { $schema };

    for (const prop in enumsBasic) {
      const propDesc = enumsBasic[prop];
      AdvenceModel.defineProperty(newThis, prop, propDesc, argObj[prop]);
    }

    for (const prop in enumsFunction) {
      const propDesc = enumsFunction[prop];
      AdvenceModel.defineProperty(
        newThis,
        prop,
        propDesc,
        propDesc.value(argObj[prop])
      );
    }

    for (const prop in enumsAdvenceModel) {
      const propDesc = enumsAdvenceModel[prop];
      AdvenceModel.defineProperty(
        newThis,
        prop,
        propDesc,
        propDesc.value.buildFromObj(argObj[prop])
      );
    }

    Object.defineProperties(newThis, { ...otherMethods, ...setters });

    for (const prop in setters) {
      newThis[prop] = argObj[prop];
    }

    return newThis;
  }
}
