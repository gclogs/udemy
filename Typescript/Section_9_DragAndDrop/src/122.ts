// 122. DOM 요소 선택 및 OOP 렌더링 (DOM Element Selection & OOP Rendering)
class ProjectInput122 {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // 콘텐츠 렌더링에 필요한 프로퍼티
    const importedNode = document.importNode(
      this.templateElement.content, // 템플릿의 내용을 참조
      true  // 깊은 복사를 이용하여 가져오기
      );

    this.element = importedNode.firstElementChild as HTMLFormElement; // 삽입하려는 노드를 가리키는 프로퍼티
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement(
      'afterbegin', this.element
    )
  }
}

const prjInput122 = new ProjectInput122();HTMLElement