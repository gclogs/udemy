/**
 * 【한글자막】 Typescript :기초부터 실전형 프로젝트까지 with React + NodeJS
 * 
 * - 순서 -
 * 83. 인터섹션 타입
 * 84. 타입 가드에 대한 추가 정보
 * 85. 구별된 유니언
 * 86. 형변환
 * 87. 인덱스 속성
 */

type Admin = {
  name: string,
  privileges: string[]
}

type Employee = {
  name: string,
  startDate: Date
}

/**
 * 83. [Intersection Type]
 * One type that satisfies all types.
 * 
 * '&' The method of combining multiple type definitions using operators
 * is called the intersection type definition method.
 * 
 * Like this example code.
 */ 
type ElevatedEmployee = Admin & Employee;

const el: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
}

// 83. using union type & intersection type
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

/**
 * 84. [1] typeof를 사용한 타입 가드
 */
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }

  return a + b;
}

type UnknownEmployee = Employee | Admin;


/**
 * 84. [2] in 키워드를 사용한 타입 가드
 *  
 * typeof 키워드는 객체 프로퍼티에 접근하기 못한다.
 * 원시적인 타입인 'object', 'bool' 등의 타입만 가능
 * 
 * 이유는 ts의 '사용자 정의 타입'을 js가 이해하지 못하기 때문
 */
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name' + emp.name);
  if ('privileges' in emp) {
    console.log('privileges : ' + emp.privileges)
  }
  if ('startDate' in emp) {
    console.log('startDate : ' + emp.startDate)
  }
}

class Car {
  drive() {
    console.log('Driving ...')
  }
}

class Truck {
  drive() {
    console.log('Driving a Truck ...')
  }

  loadCargo(amount: number) {
    console.log('Loading Cargo..' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

/**
 * 84. [3] instanceof 키워드를 사용한 타입 가드
 * 
 * instanceof 키워드는 '문자열로 타입을 체크'할 때,
 * '오타 위험성'을 현저히 감소시켜준다.
 * 
 * 그리고 더 우아하고 이쁜 코드를 작성할 수 있다.
 * 
 * 단점 : interface는 instanceof 키워드는 사용할 수 없다.
 * 런타임시 interface는 타입스크립트의 독자적 키워드이므로,
 * js에서는 없는 키워드라 사용할 수도 없음.
 * 
 * 클래스가 되는 이유는 생성자함수이기 때문에
 */
function useVehicle(vehicle: Vehicle) {
  vehicle.drive()
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: 'bird';
  flyingSpeed: number;
  voice?: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
  voice?: number;
}

type Animal = Bird | Horse;

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

/**
 * 85. 구별된 유니언
 * 
 * switch 문에 animal.type과 같은 타입 배정을(를) 통해,
 * '타입 안정성'과 객체에 '어떤 프로퍼티를 사용'할 수 있는지
 * 정확히 파악할 수 있으며 '오타 위험성' 또한 줄여준다.
 * 
 * @param animal 동물
 */
function moveAnimal(animal: Animal) {
  /*
    in 키워드를 사용하여 구별할 수 있지만,
    다수의 동물들을 입력할수록 코드가 더 길어짐.
  */
  // if ('flyingSpeed' in animal) {
  //   animal.flyingSpeed
  // }
  
  let speed: number;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      animal.voice = 10;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      animal.voice = 20;
      break;
  }
}

moveAnimal({type: 'bird', flyingSpeed: 30});
moveAnimal({type: 'horse', runningSpeed: 10});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

/**
 * 86. 형 변환 - 특정 값이 특정 타입임을 알리려고 할 때 유용함
 */

// [1] 홑화살괄호는 리액트의 파일 찾기에 대한 사안으로 충돌 우려가 있으므로
const userInputElement1 = <HTMLInputElement>document.getElementById('user-input')!;

// [2] 아래와 같이 as 키워드를 사용하여 형변환을 할 수 있음.
const userInputElement2 = document.getElementById('user-input')! as HTMLInputElement;
userInputElement2.value = 'Hi There!';


// [3] 느낌표를 사용하여 NULL이 있는지 없는지, 요소가 무엇인지 모를 때 아래와 같이 체크한다.
const userInputElement3 = document.getElementById('user-input');
if (userInputElement3) {
  (userInputElement3 as HTMLInputElement).value = 'Hi There!'
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

/**
 * 87. 인덱스 속성
 */

interface ErrorContainer {
  [key: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!'
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //