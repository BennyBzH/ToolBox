export function Log() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalFunction = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`Arguments for ${propertyKey} :`, { ...args });

      const result = originalFunction.apply(this, args);

      console.log(`Result of ${propertyKey} :`, { result });

      return result;
    };

    return descriptor;
  };
}
