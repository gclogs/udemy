/**
 * 【한글자막】 Typescript :기초부터 실전형 프로젝트까지 with React + NodeJS
 * 
 * - 순서 -
 * 105. 퍼스트 클래스 데코레이터
 */

// 105. 데코레이터 함수
function Logger(constructor: Function) {
  console.log('Logging');
  console.log(constructor);
}

@Logger
class Person {
  name = 'Max';
  constructor() {
    console.log('Creating person object...')
  }
}

const pers = new Person();