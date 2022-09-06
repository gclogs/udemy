

# 참고 자료
1. [데코레이터 / 팩토리 - TypeScript Guidebook - GitBook](https://yamoo9.gitbook.io/typescript/decorator/factory)

2. [속성 데코레이터 - TypeScript Guidebook - GitBook](https://yamoo9.gitbook.io/typescript/decorator/properties)

3. [Typescript의 Decorator - 2. Property Decorator, 간단한 Dependency Injection](https://partnerjun.tistory.com/62)

4. [[타입스크립트] 데코레이터(Decorator) "클래스, 메소드, 접근자, 프로퍼티, 파라미터 데코레이터" ](https://fe-churi.tistory.com/41)

5. [[JS]Syntax Sugar(문법 설탕)](https://dkje.github.io/2020/09/02/SyntaxSugar/)

- 5-a. __112. 클래스 데코레이터에서 클래스 반환__ 강의 에서 `문법 설탕(SYNTACTIC SUGAR)` 언급이 나오는데 이는 새 컨스트럭터 함수 즉 `읽는 사람 또는 작성하는 사람이 편하게 디자인 된 컨스트럭터 함수(문법)다` 라고 할 수 있다. _자세한 내용은 위 링크를 확인하길._

- 5-b. __113. 기타 데코레이터 반환 타입__ 역시 이해가 필요하다. _익숙해져 봅시다_

6. [TypeScript Decorator 직접 만들어보자](https://dparkjm.com/typescript-decorators)

7. [AutoBind TypeScript decorator - Code Review Stack Exchange](https://codereview.stackexchange.com/questions/272199/autobind-typescript-decorator)
- 7-a. __114. 예시: "Autobind" 데코레이터 만들기__ 에서 나오는 `auto bind decorator` 를 만드는데 유용한가 즉, `바닐라 스크립트에서 ES5의 문법인 bind 메소드를 직접 사용하면 더 편하지 않는가`에 대한 토론
- 7-b. 자바스크립트의 this에 대한 이해도가 필요하다고 본다. 기본적인 내용으로 꼭 숙지하길 바란다. 
  - [[자바스크립트] 명시적으로 this를 바인딩하는 방법 (feat 코어 자바스크립트)](https://overcome-the-limits.tistory.com/348)
  - [[모던 자바스크립트 튜토리얼 中 4.4 메서드와 this](https://ko.javascript.info/object-methods)