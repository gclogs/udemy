/**
 * 【한글자막】 Typescript :기초부터 실전형 프로젝트까지 with React + NodeJS
 * 
 * - 순서 -
 * 105. 퍼스트 클래스 데코레이터
 * 106. 데코레이터 팩토리 작업하기
 * 107. 더 유용한 데코레이터 만들기
 * 108. 여러 데코레이터 추가하기
 * 109. 속성 데코레이터에 대해 알아보기
 * 110. 접근자 & 매개변수 데코레이터
 */

function PropertyLog(target: any, propertyName: string | Symbol) {
  console.log("Property Decorator!");
  console.log(target, propertyName);
}

function AccesorLog(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accesor Decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function MethodLog(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log("Method Decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function ParameterLog(target: any, name: string | Symbol, position: number) {
  console.log("Parameter Decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class ProductB {
  @PropertyLog
  private title;
  private _price;

  @AccesorLog
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive !")
    }
  }

  constructor(t: string, p: number){ 
    this.title = t;
    this._price = p;
  }

  @MethodLog
  getPriceWithTax(@ParameterLog tax: number) {
    return this._price * ( 1 + tax );
  }
}