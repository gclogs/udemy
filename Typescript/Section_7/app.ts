/**
 * 【한글자막】 Typescript :기초부터 실전형 프로젝트까지 with React + NodeJS
 * 
 * - 순서 -
 * 94. 내장 제네릭 & 제네릭이란?
 * 95. 제네릭 함수 생성하기
 * 96. 제약 조건 작업하기
 * 97. 다른 일반 함수
 * 98. keyof" 제약 조건
 * 99. 제네릭 클래스
 * 101. 제네릭 유틸리티 타입
 */

const names: Array<string> = [];
names[0].split( ' ' )

// promise 변수에 제너릭 타입을 추가함으로써 '어떤 데이터를 반환 해야 하는지' 알고 있다.
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Thios is done!');
  }, 2000);
})

// 94. 제너릭을 사용하면 보다 나은 타입 안정성을 확보할 수 있기 때문이다.
// * 추가적인 타입 정보를 얻는 데에 제너릭 타입이 도움이 됨.
promise.then(data => {
  data.split(' ');
})





// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//                  CASE 95. 제네릭 함수 생성하기
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function merge(objA: object, objB: object) {
  return Object.assign(objA, objB)
}

const mergedObj = merge({name: 'Max'}, {age: 30});
mergedObj.name; // 95. 타입스크립트가 mergedObj가 object인지 프로퍼티를 가지고 있는지 '알 수도 있고 모를 수도 있기 때문에' 오류가 남.

// 95. 아래 코드와 같이 형변환을 수행하여 name과 age 키를 가져야 한다고 알려줄 수는 있지만,
// 이러한 작업은 매우 번거롭다.
const casting_mergedObj = merge({name: 'Anna'}, {age: 27}) as {name: string, age: number};
casting_mergedObj.name;

/**
 * https://stackoverflow.com/questions/42421501/error-ts2345-argument-of-type-t-is-not-assignable-to-parameter-of-type-objec
 * 
 * T와 U의 인터섹션을 반환한다고 추론한다.
 * 
 * 함수를 정의할 때, 타입이 동적으로 돌아갈 수 있음을 의미한다.
 * 따라서 T와 U는 서로 다른 타입이며 사용자의 입맛에 따라 유연하게 사용할 수 있음.
 */
function GenericMerge<T extends Object, U>(o1: T, o2: U) {
  return Object.assign(o1, o2);
}

/**
 * object가 구체적인 타입이 아니라 
 * 어떤 객체든 입력이 가능하기 때문에
 * 두 객체의 인터섹션을 반환할 수 있음.
 * 
 * 따라서 GenericMergerdObj에 저장된 데이터가
 * 두 입력값 데이터의 인터섹션임을 타입스크립트가 인식 가능
 */
const GenericMergedObj = GenericMerge({name: 'Max'}, {age: 30});
GenericMerge.name; // 타입스크립트가 인식 가능하다는 방증 


/**
 * [Tip] 어떤 타입을 작성해야 하는지 구체적으로 알려줄 수 있음.
 * 
 * 아래와 같이 제너릭 타입으로 구체적인 타입을 작성하게 도와줄 수는 있지만,
 * 타입스크립트에서 이는 권장하지 않는 코드이다.
 * 
 * 즉 타입스크립트가 '타입 추론'을 가능하게 만드는게 더 좋다는 뜻이다.
 */
const copyGenericMergeObj = GenericMerge<{name: string, hobbies: string[]}, {age: number}>({name: 'Max', hobbies: ['sports']}, {age: 30});
copyGenericMergeObj.age;





// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//                    CASE 96. 제약 조건 작업하기
//                    CASE 97. 다른 일반 함수
//                    CASE 98. keyof 제약 조건 
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
 * 96. 
 * 
 * [keypoint] extends(상속) 키워드로 제약 조건 두기
 * 
 * 제너릭 타입을 구체적으로 입력하지 않으면, 유연한 작업이 가능하지만
 * T와 U의 타입에 제약을 둠으로써 보 '불필요한 에러'나 '오작동'을 방지하여
 * 
 * 최적의 방식으로 제너릭 타입을 사용합시다.
 */
function copyGenericMerge<T extends object, U extends object>(o1: T, o2: U) {
  return Object.assign(o1, o2);
}


interface Lengthy {
  length: number;
}
/**
 * 97.
 * 장점 : 문자열이나 배열로 제한하고 싶지 않고, 가능한 모든 타입을 처리할 수 있음.
 * 
 * 1. 많은 오버로드를 만들지 않고
 * 2. 아주 긴 유니언 타입을 만들지 않아도 됨.
 * 
 * 이처럼 유연한 작업이 요구될 때 제너릭 타입을 사용합시다.
 * @param element 배열 요소
 * @returns T, string
 */
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1 elements';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText]
}

console.log(countAndDescribe('Hi there!'));

/**
 * 98.
 * 타입스크립트가 obj 객체에 key가 있는지 확실치 않기 때문에,
 * generic을 사용하지 않고 obj[key]에 접근하는 경우 ERROR
 * 
 * 따라서 제너릭 타입을 사용하여
 * 제약조건을 둠으로써 keyof 키워드로 1번째 타입의 속성을 얻을 수 있음
 * 
 * @param obj 
 * @param key 
 * @returns 
 */
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key]; // 
}

// 98. 객체에 {name: 'Max'} 값을 추가하면 ts2345 에러 해결
extractAndConvert({}, 'name');




// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//                    CASE 99. 제네릭 클래스
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

type Primitives = boolean | string | number;

class DataStorage<T extends Primitives> {
  private data: T[] = [];

  additem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.additem('Max');
textStorage.additem('Anna');
textStorage.removeItem('Max');
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>();
numberStorage.additem(1);
numberStorage.additem(8);
numberStorage.additem(4);
numberStorage.removeItem(8);
console.log(numberStorage.getItems());

// README.md의 2번 자료 참고.

/**
 * object 타입을 선호하지 않는 이유는 '객체는 메모리에 저장' 되기 때문에 
 * addItem 메소드로 객체를 추가하고 저장해도
 * removeItem 메소드를 사용하지 못한다.
 * 
 * 크기가 고정적으로 정해져 있지도 않고 값 자체가 변수에 저장될 수도 없기 때문에
 * 매번 저장되는 메모리 장소도 변경되기 때문에
 * 
 * 객체로 저장, 삭제 작업을 하는 것은 번거로울 수 밖에 없다.
 * 
 * 하지만 변수에 '메모리 참조값'을 저장하여
 * 제거는 할수는 있다만 그리 좋은 방안은 아니다.
 */
const objStorage = new DataStorage<object>();

let ManuObject = {name: 'Manu'};

objStorage.additem({name: 'Max'});
objStorage.additem(ManuObject);
objStorage.removeItem({name: 'Manu'});
console.log(objStorage.getItems());





// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//                  CASE 101. 제네릭 유틸리티 타입
//               https://merrily-code.tistory.com/164
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
interface CourseGoal {
  title: string;
  description: string;
  completeUnitl: Date;
}

function createCourseGoal(title: string, description: string, completeUnitl: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUnitl = completeUnitl;
  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['Max', 'Anna'];
names.push(['Holy']);