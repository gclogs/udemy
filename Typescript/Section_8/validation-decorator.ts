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
 * 115. 데코레이터로 타당성 검증 - 첫 번째 단계
 * 116. 데코레이터로 타당성 검증 - 완료
 */

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//               CASE 115. 데코레이터로 타당성 검증 - 첫 번째 단계
//               CASE 116. 데코레이터로 타당성 검증 - 완료
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=



interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]
  }
}

/**
 * 117. 버그 검증자 수정하기
 * 
 * 현재 형식에서 우리의 검증 로직은 완전히 정확하지 않습니다. 의도한 대로 작동하지 않습니다.
 * 현재 배열에는 단 하나의 검증자 (예. 'required') 값이 저장되어 있습니다. (물론 이 값은 필요가 없습니다.) 배열에는 잠재적으로라도 여러 값이 저장되어야 있어야 합니다.
 * 이를 위해 코드를 조정하는 방법은 다음과 같습니다
 */

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Cource {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', e => {
  e.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;
  
  const createdCource = new Cource(title, price);
  console.log(createdCource);
})