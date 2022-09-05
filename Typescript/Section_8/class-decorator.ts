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
 * 112. 클래스 데코레이터에서 클래스 반환 (및 변경)
 */

 
function Logger(logString: string) {
  console.log("LOGGER FACTORY")
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY")
  // 도대체 어떻게 하면 제약조건을 기괴한 방법으로 주지...?? 익명 함수라는 건 알겠다만...
  return function<T extends { new (...args: any[]): {name: string} }>(originalConstructor: T) {
    return class extends originalConstructor {
      constructor(..._: any[]) { // _ 매개변수를 사용하여 '나 이거 갖고 있어!' 라고 알려줄 수 있음.
        super();
        console.log('Rendering template')
        const hookEl = document.getElementById(hookId);
        const p = new originalConstructor();
        if (hookEl){ 
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    }
  }
}

@Logger('LOGGING')
@WithTemplate('<h1>We are Object</h1>', 'app')
class PersonD {
  name = 'Max'; // name 프로퍼티가 없어지면 오류가 생기는 기이한 현상

  constructor() {
    console.log('Creating person object...')
  }
}

const persD = new PersonD();