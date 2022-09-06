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
 * 114. 예시: "Autobind" 데코레이터 만들기
 */


/**
 * AutoBind 라는 데코레이터 함수를 만들어
 * this 바인딩을 개발자가 생각하는 대로 동작하게 할 수 있음.
 * 
 * this의 바인딩은 본래 객체의 참조를 함으로써
 * 개발자가 원하는 방식을 채택하지 못하는 이슈가 자주 발생했는데
 * 
 * 이러한 이슈를 데코레이터가 대체해줌으로써 this의 유연성을 확장시켜줌.
 */
function AutoBind(_target: any, _methodName: string | Symbol, descripter: PropertyDescriptor) {
  console.log(descripter.value);
  const originalMethod = descripter.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!"

  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const btn = document.querySelector('button')!;
btn.addEventListener('click', p.showMessage); // bind 메소드로 this가 Printer 클래스를 참조할 수 있게 도와주기 (vanilla javascript)
