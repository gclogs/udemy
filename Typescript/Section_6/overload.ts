/**
 * 【한글자막】 Typescript :기초부터 실전형 프로젝트까지 with React + NodeJS
 * 
 * - 순서 -
 * 88. 함수 오버로드 - 다양한 매개변수를 지닌 함수를 만들 수 있음.
 * 89. 선택적 체이닝
 */





type CombinableB = string | number;
type NumericB = number | boolean;

type UniversalB = Combinable & Numeric;

/**
 * 88. 오버로드를 사용하는  경우는
 * 함수가 자체적으로 리턴 타입을 '추론 하지 못하는' 경우에 유용합니다.
 * 
 * 즉 함수에저 지원할 수 있는 다양한 조합에 대해 어떤 타입이 반환되는지 정확히 알 수 있음
 */
function add(a: string, b:number): string;
function add(a: number, b:string): string;
function add(a: string, b:string): string;
function add(a: number, b:number): number;
function add(a: CombinableB, b: CombinableB) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }

  return a + b;
}

const result = add('Max', 'Scquat');
result.split('')


// 89. 선택적 체이닝
const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  job: { title: 'CEO', desc: 'My own company' }
}

console.log( fetchedUserData?.job?.title );


// 90. NULL 병합

const userInput = null;
const userInput2 = ''; 

// 데이터가 null 혹은 undefined 둘중 하나라도 있다면 폴백을 사용함.
const storedData = userInput ?? 'DEFAULT';

// result : ''
const storedData2 = userInput2 || 'FallBack';