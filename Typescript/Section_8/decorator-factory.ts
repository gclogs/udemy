/**
 * 【한글자막】 Typescript :기초부터 실전형 프로젝트까지 with React + NodeJS
 * 
 * - 순서 -
 * 105. 퍼스트 클래스 데코레이터
 * 106. 데코레이터 팩토리 작업하기
 */

/**
 * 106. 데코레이터 팩토리
 * 값을 건너뛸 수 있다는 것이 장점
 * 
 * 내부에서 설정할 때보다 많은 영향력과 가능성을 펼칠 수 있음.
 * 전달 받은 값으로 유연하게 코드를 짤 수 있다는 것.
 */
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

// 데코레이터 팩토리를 사용하여 값을 전달할 수 있음.
@Logger('Logging - Message')
class PersonB {
  name = 'Max';

  constructor() {
    console.log('Creating person object...')
  }
}

const persB = new PersonB();