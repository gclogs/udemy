/**
 * 【한글자막】 Typescript :기초부터 실전형 프로젝트까지 with React + NodeJS
 * 
 * - 순서 -
 * 105. 퍼스트 클래스 데코레이터
 * 106. 데코레이터 팩토리 작업하기
 * 107. 더 유용한 데코레이터 만들기
 * 108. 여러 데코레이터 추가하기
 * 109. 속성 데코레이터에 대해 알아보기
 */

function Logger(logString: string) {
  console.log("LOGGER FACTORY") // 1번째 실행
  return function(constructor: Function) { // 4번째 실행
    console.log(logString);
    console.log(constructor);
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY") // 2번째 실행
  return function(contructor: any) { // 3번째 실행
    console.log('Rendering template')
    const hookEl = document.getElementById(hookId);
    const p = new contructor();
    if (hookEl){ 
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  }
}

@Logger('LOGGING')
@WithTemplate('<h1>We are Object</h1>', 'app')
class PersonC {
  name = 'Max';

  constructor() {
    console.log('Creating person object...')
  }
}

const persC = new PersonB();

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//               CASE 109. 속성 데코레이터에 대해 알아보기
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
 * 데코레이터 팩토리가 아니라 데코레이터 함수로 작성함.
 * 
 * @param target 
 * @param propertyName 
 */
function PropertyLog(target: any, propertyName: string | Symbol) {
  console.log("Property Decorator")
  console.log(target, propertyName);
}

class Product {
  @PropertyLog
  private title;
  private _price;

  set price(val: number) {
    if(val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax)
  }
}