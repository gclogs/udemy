/**
 * https://www.typescriptlang.org/ko/docs/handbook/enums.html
 * Enum은 모든 상수 변수들을 정의하고 관리하는 것을 보완하는 대안 방안임.
 */

enum Role {
  ADMIN, READ_ONLY, AUTHOR
}

const otherPerson = {
  name: "Maximilian",
  age: 30,
  hobbies: ['Reading', 'Cooking'],
  role: Role.ADMIN
}

if(otherPerson.role == Role.ADMIN) {
  console.log("READ ONLY USER");
}