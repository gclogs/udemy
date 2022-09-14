// 133. Using a Getter

enum ProjectStatus129 {
  Active,
  Finished
}

/**
 * #129
 * 항상 동일한 객체의 구축 방법을 취하고자
 * 클래스 프로젝트를 만듦
 */
class Project129 {
   constructor(
    public id: string, 
    public title: string, 
    public description: string, 
    public people: number, 
    public status: ProjectStatus129
    ) {

   }
}

/**
 *  #129 Project State Management
 *  */
type Listener131<T> = (items: T[]) => void;

class State131<T> {
  // #128 내용이 변경될 때마다 함수를 호출해야함
  protected listeners: Listener131<T>[] = []; 

  /**
 * #130
 * 
 * state에 추가
 * project를 'acitve' | 'finished' 항목에 추가
 * @param listenerFn 
 */
    addListener(listenerFn: Listener131<T>) {
    this.listeners.push(listenerFn);
  }
}


// #128 Project State Management
// #129 타입 명확히 해보자
class ProjectState129 extends State131<Project129> {
  // #128 상태 관리 솔루션에 초점을 두고자 any 타입으로 선언
  // #129 프로젝트 클래스를 가지는 배열
  private projects: Project129[] = [];
  private static instance: ProjectState129;

  /**
   * #128 싱글톤 생성자
   */
  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState129();
    return this.instance;
  }

  /**
   * #128 버튼 액션
   * 
   * Add Project 버튼을 클릭할 때마다 프로젝트 추가
   */
  addProject(title: string, description: string, numOfPeople: number) {
    // #128
    // const newProject = {
    //   id: Math.random().toString(), // #128 난수로 고유 id 생성
    //   title: title,
    //   description: description,
    //   people: numOfPeople
    // }
    // # 129
    const newProject = new Project129(
      Math.random().toString(), 
      title, 
      description, 
      numOfPeople, 
      ProjectStatus129.Active
    )
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
const projectstate129 = ProjectState129.getInstance();

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

/**
 * #131
 * 컴포넌트 클래스를 만들어 코드 중복을 줄이고 재사용성을 극대화 시켜줌.
 */
abstract class Component131<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  
  /**
   * #131
   * @param templateId 템플릿 요소의 id
   * @param hostElementId 호스팅 되고 있는 요소의 id
   * @param inserAtStart true = afterbegin | false = beforeend
   * @param newElementId active인지 finished인지
   */
  constructor(
    templateId: string, 
    hostElementId: string, 
    inserAtStart: boolean, 
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
      );

    this.element = importedNode.firstElementChild as U;
    if (newElementId) { // newElementId가 있으면
      this.element.id = newElementId;
    }

    this.attach(inserAtStart)
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend', 
      this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

/**
 * #132 ProjectItem Class
 * - 화면에 무언가를 렌더링할 클래스가 될 것이기에 컴포넌트를 상속 받음
 */
class ProjectItem132 extends Component<HTMLUListElement, HTMLLIElement> {
  private project: Project129;

  /**
   * #133 게터를 어떻게 활용하는지 보여줌
   */
  get getPerson() {
    if (this.project.people === 1) {
      return '1 person';
    } else {
      return `${this.project.people} persons`;
    }
  }
  
  /**
   * #132
   * 모든 프로젝트에 Id 프로퍼티가 있으므로 프로젝트 id를 포워드
   */
  constructor(hostId: string, project: Project129) {
    /**
     * # 132
     * 1. single-project는 템플릿 Id와 호스트 Id를 갖고 있음
     * 2. 베이스 클래스 생성자로 포워드
     * 3. 앞, 뒤 중 어디에 렌더링 되어야 하는지 -> 모든 신규 목록 항목은 목록의 맨 뒤로 가야 한다. (선택적 사항)
     */
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }
  
  configure() {}

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.getPerson + 'assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}

class ProjectList129 extends Component131<HTMLDivElement, HTMLElement> {
  assignedProjects: Project129[];
  
  /**
   * #130.
   * type 매개변수에 Enum을 사용하여 식별할 수 있지만,
   * 구체적인 값이 필요하기에 enum을 사용하지 않음.
   */
  constructor(private type: 'active' | 'finished') { 
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.rederContent();
   }

   rederContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase();
  }

  // #131
  configure(): void {
    // #129. Project[] 타입으로 선언하게 되면 오류가 발생함.. 왜일까
    projectState.addListener((projects: any[]) => {
      /**
       * #130
       * 프로젝트 필터링을 하여 active 프로젝트인지 finished 프로젝트인지 구분할 수 있음
       */
      const relevantProjects = projects.filter(prj =>{ 
        if (this.type === 'active') { // type이 active라면
          return prj.status === ProjectStatus129.Active // Active 반환
        }
        return prj.status === ProjectStatus129.Finished; // Finished 반환
      })
      this.assignedProjects = relevantProjects;
      this.renerProjects();
    });

  }

   private renerProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    listEl.innerHTML = ''; // #130 모든 목록 항목을 제거하여, 불필요한 재생성(rerendering)을 피함.
    for (const prjItem of this.assignedProjects) { // #128 this.assignedProject 항목을 모두 살펴봄
      /**
       * #132
       * 1. this.element.id 가 호스트 요소 id가 됨. -> 정리되지 않은 목록이 호스트가 되어야 하기 때문
       * 2. 정리되지 않은 목록의 Id를 얻어냄으로써 블랫 포인트를 없애줌
       */
      new ProjectItem132(this.element.querySelector('ul')!.id, prjItem)
    }
   }
}

class ProjectInput129 extends Component131<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

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
  configure() {
    // #123 this는 이벤트 리스너를 바인딩하고 있음
    // 내가 원하고자 하는 this는 클래스를 바인딩하여 적재적소 사용하고 싶은데 그게 안됨.
    // bind 메서드를 사용하여 새로운 함수를 반환하자
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent(): void {}
}

const prjInput129 = new ProjectInput129();
const activePrjList129 = new ProjectList129('active');
const finishedPrjList129 = new ProjectList129('finished');
