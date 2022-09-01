/**
 * 【한글자막】 Typescript :기초부터 실전형 프로젝트까지 with React + NodeJS
 * 
 * - 순서 -
 * 72. 첫 번째 인터페이스
 * 73. 클래스와 인터페이스 사용하기
 * 74. 왜 인터페이스인가
 * 75. 읽기 전용 인터페이스 속성
 * 76. 인터페이스 확장하기
 * 77. 함수 타입으로서의 인터페이스
 * 78. 선택적 매개변수 & 속성
 */

// 73. 인터페이스는 구체적인 구현이 아니라 '서로 다른 클래스 간의 공유'를 위해 사용됨.
// interface Person {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

interface Named {
  readonly name?: string; // don't use 'public / private / protected'
  outputName?: string;
}

// 76. 인터페이스의 경우 '다수 상속'이 가능하지만, 클래스의 경우 '단일 상속'만 가능하다.
interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;

  constructor(n: string) {
    // this.name = n; -> 선택적 속성인 ? 을 사용하지 않는다면, 로직이 항상 초기화 되도록 코드를 짜야함.
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}

let user1: Person;

user1 = {
  name: 'Max',
  // age: 30,

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
};

user1.greet('Hi my name is');

// 77. 사용자 정의 타입 보다 보편적이고 코드 양도 줄일 수 있는 대체 구문이다.(?)
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
}