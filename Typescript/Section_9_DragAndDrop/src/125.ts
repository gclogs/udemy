// 125. Fetching User Input

/**
 * #124 
 * 
 * AutoBind 데코레이터를 사용하여 bind 메서드의 재사용성을 대폭 높여주고,
 * 잠재적인 오류를 방지해준다는 이점이 있다.
 * 
 * 뭐 autobind에 대한 package도 있으니 그걸 사용하던지
 * 우리에겐 stackoverflow가 있지 않은가 ! copy & paste!
 * @param _target 
 * @param _propName 
 * @param descriptior 
 * @returns 
 */
 function AutoBind(_target: string, _propName: string, descriptior: PropertyDescriptor) {
  const originalMethod = descriptior.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind( this );
      return boundFn;
    }
  }
  return adjDescriptor;
}

class ProjectInput125 {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // #122 콘텐츠 렌더링에 필요한 프로퍼티
    const importedNode = document.importNode(
      this.templateElement.content, // #122 템플릿의 내용을 참조
      true  // #122 깊은 복사를 이용하여 가져오기
      );

    this.element = importedNode.firstElementChild as HTMLFormElement; // #122 삽입하려는 노드를 가리키는 프로퍼티
    /**
     * #123 
     * 
     * element.id 에 접근하여 user-input 아이디를 추가
     * 
     * element 는 <form> 요소임 -> HTMLFormElement로 캐스팅 했기 때문임.
     * 결과값은 <form id="user-input">{ }</form>
     */
    this.element.id = 'user-input';

    /**
     * #123
     * 
     * 아래 input 요소들은 form 요소인 element 내부안에 있는 #title, #description, #people 을 참조할거임.
     * 즉 form > #title && #description && #people
     * form 태그 안에 #title / #description / #people 이 들어있는 거임.
     */
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  /**
   * #125
   * 
   * 검증 함수를 만들어 form 입력값을 제대로 받게 해주자.
   */
  private gatherUserInput(): [string, string, number] {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    // #125. trim() 메서드를 사용하여 입력 공란이 없으면 안되는 검증 로직
    if 
    (
    enteredTitle.trim().length === 0 || 
    enteredDescription.trim().length === 0 || 
    enteredPeople.trim().length === 0
    ) {
      alert('Invalid input, plz try again!')
    } else { // 125. 유요한 값이 들어오면 튜플을 리턴
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private attach() {
    this.hostElement.insertAdjacentElement(
      'afterbegin', this.element
    )
  }

  /**
   * #123 form 값들이 submit 될때마다 발동되는 이벤트 함수
   * 
   * @param event event
   */
   @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault(); // 기본 양식 제출 방지 -> 엄한값(이상한 값)이 들어오면 안되기 때문에

  }

  /**
   * #123 element를 미세 조정하기 위해 만든 메서드
   * 
   * 타입스크립트에서는 element가 form 요소라는 것을 타입 추론 하여 알기 때문에,
   * submit 이벤트를 제공함.
   */
  private configure() {
    // #123 this는 이벤트 리스너를 바인딩하고 있음
    // 내가 원하고자 하는 this는 클래스를 바인딩하여 적재적소 사용하고 싶은데 그게 안됨.
    // bind 메서드를 사용하여 새로운 함수를 반환하자
    this.element.addEventListener('submit', this.submitHandler);
  }
}

const prjInput125 = new ProjectInput125();HTMLElement