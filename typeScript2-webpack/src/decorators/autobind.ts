// Autobind 함수의 인자 :
// 1. target (클래스의 prototype 객체)/ ProjectInput.prototype
// 2. 메서드 이름/ 'submitHandler'
// 3. 메서더의 설명자 객체 / PropertyDescriptor 객체 - 내부에 value, writable, enumerable, configurable 등 포함
export function Autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjDescriptor;
}
