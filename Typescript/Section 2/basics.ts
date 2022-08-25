

/**
 * 타입 배정(type assignment)을 함으로써 타입이 보다 정적으로, 
 * 실수 없이 변수의 값이 명확하도록 함.
 * @param n1 
 * @param n2 
 * @param showResult 
 * @param phrase 
 * @returns 
 */
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  if (showResult) {
    console.log(`${phrase} ${n1 + n2}`);
  } else {
    return n1 + n2;
  }
}

const number1 = 5;
const number2 = 9.1;
const printReuslt = true;
const resultPhrase = `Result is : `

const result = add(number1, number2, printReuslt, resultPhrase);
console.log( result );