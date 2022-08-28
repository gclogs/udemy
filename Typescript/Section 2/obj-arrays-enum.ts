
/**
 * 타입을 명시적으로 적는 것은 그리 좋은 것이 아님.
 * 타입스크립트가 직접 타입 추론을 하도록 냅두는 것이 효율이 좋음
 * 
 * 즉, 타입 추론이 얼마나 좋은 기능인지 체감을 할 것임.
 */
// const person: {
//   name: string,
//   age: number
// } = {

const person: {
  name: string,
  age: number,
  hobbies: string[],
  role: [number, string] // tuple
} = {
  name: "Maximilian",
  age: 30,
  hobbies: ['Reading', 'Cooking'],
  role: [2, 'author']
}

/* role 프로퍼티에서 정확히 2개의 값만 있어야 한다는 것이 성립이 됨. 
  따라서 이런 예외적인 에러를 처리하지 못함. */
person.role.push('admin');

/* 1번째 값으로는 숫자를, 
  2번째 값으로는 문자열을 받아야 성립하기 때문에 
  규칙에서 벗어나므로 오류 */
// person.role[1] = 3;

let favoriteActivities: string[];
favoriteActivities = ['Test'];

console.log(person.name);

for( const hobby of person.hobbies ) {
  console.log(hobby.toUpperCase());
  // console.log(hobby.map()) !! ERROR !!
}