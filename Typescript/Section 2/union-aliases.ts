function add(n1: number, n2: number) {
  return n1 + n2;
}

/**
 * 타입 알리어스를 사용하여, 코드의 양을 줄이며
 * 중복을 줄일 수 있음.
 * 
 * 유도리 있게 사용만 한다면,
 * 개발자가 작성한 타입 알리어스의 의도를 명확하게 반영할 수 있음
 * 
 */
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

/**
 * 유니언(조합) 타입을 사용하면 코드에 적용한 파라미터를 보다 유연하게 사용할 수 있음.
 * 
 * 다만 필자가 생각하기에 '유니언 타입' 같은 경우, 라이브러리를 만들때나 유용하지
 * 실제 프로젝트에서 사용할 일이 있을까 의문이다.
 * 
 * 로버트 마틴이 저서한 '클린코드' 에서는 '한 가지의 일만' 하는 '작은 함수'의 필요성과 효용성, 효율성에 대해
 * 언급하는데 필자도 그렇게 생각한다.
 * 
 * 즉 combine이라는 '조합' 함수는 필요 없다고 생각이 든다.
 * 
 * 숫자와 숫자끼리 더한 addNumber 함수와 문자열과 문자열끼리 더하는 addString과 같은
 * 작은 함수로 세분화 하며 개발한다면 협업 프로젝트에서는 더 좋지 않을까 라는 생각이...
 * 
 * 한 마디로 복잡하게 활용성을 넓힌다고 좋은 건 아니라고 생각이 든다.
 * 개인적인 소견이므로 참고만.
 * 
 * '유니언 타입이 나쁘다는 것은 절대 아니다'
 * */

/**
 * 
 * @param i1 첫 번째 인자값 (숫자와 문자열만 받음)
 * @param i2 두 번째 인자값 (이하동문)
 * @param resultConversion 문자열로 더하는 값을 바꿔줌.
 * @returns any
 */
function combine(
  i1: Combinable, 
  i2: Combinable,
  // 리터럴 타입을 사용함으로써 보다 정확한 값을 지정함. +유니언 타입을 사용하여 활용도가 높게 로직을 구성함.
  resultConversion: ConversionDescriptor
  ) {
  let result;
  if (i1 == 'number' && i2 == 'number' || resultConversion === 'as-number') {
    result = +i1 + +i2;
  } else {
    result = i1.toString() + i2.toString()
  }
  return result;
}

const combinedAges = combine(20, 36, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('20', '36', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine("Anna", "Hela", 'as-text');
console.log(combinedNames);