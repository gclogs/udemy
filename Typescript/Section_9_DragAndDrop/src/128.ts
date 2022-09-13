// 128. Managing Application State with Singletons

/**
 * #128 개선 항목
 * 1. 타입을 명확히 하기
 * 2. 중복 출력 방지
 */

// #128 Project State Management
class ProjectState128 {
  // #128 상태 관리 솔루션에 초점을 두고자 any 타입으로 선언
  private projects: any[] = [];
  private static instance: ProjectState128;
  // #128 내용이 변경될 때마다 함수를 호출해야함
  private listeners: any[] = []; 

  /**
   * #128 싱글톤 생성자
   */
  private constructor() {

  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState128();
    return this.instance;
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  /**
   * #128 버튼 액션
   * 
   * Add Project 버튼을 클릭할 때마다 프로젝트 추가
   */
  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = {
      id: Math.random().toString(), // #128 난수로 고유 id 생성
      title: title,
      description: description,
      people: numOfPeople
    }
    this.projects.push(newProject);
    // #128 새로운 프로젝트를 추가하거나 변동이 있을 때마다 모든 리스너 함수를 호출
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

/**
 * #128
 * 
 * 싱글톤으로 생성된 인스턴스임 한 번만 생성 가능
 * 하나의 상태 관리 객체를 가질 수 있으므로
 * 동일한 객체로 항상 어디서든, 작업할 수 있게됨.
 * 
 * 싱글톤 개념을 확실하게 이해해야겠음.
 */
const projectstate = ProjectState128.getInstance();

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

/**
 * #127
 * 
 * 검증하는 인터페이스를 만들어 validate 함수에 할당
 * 옵셔널 연산자를 사용해 프로퍼티가 꼭 필요하지 않음을 알림
 * 
 */
interface Validatable128 {
  value: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

/**
 * #127
 * 
 * Validatable128 인터페이스를 정적 타입으로 받고,
 * 이를 기반으로 인수로 들어온 값을 검증하는 함수
 * @param validatableInput 값
 * @returns boolean
 */
function validate127(validatableInput: Validatable128) {
  let isValid = true;
  if (validatableInput.required) { // #127 required가 true고, 공란이 아니라면 true
    isValid = isValid && validatableInput.value.toString().trim().length !== 0
  }
  if (validatableInput.minLength != null && typeof validatableInput.value == 'string') {
    isValid = isValid && validatableInput.value.length > validatableInput.minLength;
  }
  if (validatableInput.maxLength != null && typeof validatableInput.value == 'string') {
    isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
  }
  
  if (validatableInput.min != null && typeof validatableInput.value == 'number') {
    isValid = isValid && validatableInput.value > validatableInput.min;
  }
  if (validatableInput.max != null && typeof validatableInput.value == 'number') {
    isValid = isValid && validatableInput.value < validatableInput.max;
  }

  return isValid;
}

class ProjectList128 {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];
  
  constructor(private type: 'active' | 'finished') { 
    this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    this.assignedProjects = [];

    const importedNode = document.importNode(
      this.templateElement.content,
      true
      );

    this.element = importedNode.firstElementChild as HTMLElement; 
    this.element.id = `${type}-projects`;


    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renerProjects();
    });

    this.rederContent();
    this.attach();
   }


   private renerProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    for (const prjItem of this.assignedProjects) { // #128 this.assignedProject 항목을 모두 살펴봄
      const listItem = document.createElement('li') 
      listItem.textContent = prjItem.title;
      listEl?.appendChild(listItem) // #128 모든 항목에 <li>  목록을 추가
    }
   }
   
  private rederContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforebegin', this.element);
  }
}

class ProjectInput128 {
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
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const ValidatableTitle: Validatable128 = {
      value: enteredTitle,
      required: true
    }

    const ValidatableDescription: Validatable128 = {
      value: enteredDescription,
      required: true,
      min: 1
    }

    const ValidatablePeople: Validatable128 = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5
    }

    // #125. trim() 메서드를 사용하여 입력 공란이 없으면 안되는 검증 로직
    if
    (
      !validate(ValidatableTitle) &&
      !validate(ValidatableDescription) &&
      !validate(ValidatablePeople)
    ) {
      alert('Invalid input, plz try again!')
      return;
    } else { // #125 유요한 값이 들어오면 튜플을 리턴
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
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectstate.addProject(title, desc, people);
      this.clearInput();
    }
  }

  /**
   * #127
   * Input 요소의 내용을 초기화
   */
  private clearInput() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
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

const prjInput128 = new ProjectInput128();
const activePrjList128 = new ProjectList128('active');
const finishedPrjList128 = new ProjectList128('finished');
