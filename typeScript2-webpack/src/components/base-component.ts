// Component Base Class
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement; // 템플릿 요소 (<template id="project-input">를 참조)
  hostElement: T; // 이 컴포넌트를 렌더링할 부모 요소 (예: <div id="app"> 또는 <ul>)
  element: U; // 실제로 생성되어 렌더링될 DOM 요소 (예: <form>, <section>, <li> 등)

  constructor(
    templateId: string, // 가져올 템플릿의 id (예: 'project-input', 'single-project')
    hostElementId: string, // 렌더링될 위치가 될 요소의 id (예: 'app', 'active-projects')
    insertAtStart: boolean, // 렌더링 위치: true = 맨 앞에 추가 / false = 맨 뒤에 추가
    newElementId?: string // 새로 생성된 요소에 부여할 id (선택 사항)
  ) {
    // 1. 템플릿 요소 가져오기 (<template id="...">)
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;

    // 2. 렌더링될 부모 요소 가져오기
    this.hostElement = document.getElementById(hostElementId)! as T;

    // 3. 템플릿 내용을 복사하여 새로운 노드 생성 (true: 깊은 복사)
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    // 4. 템플릿에서 가져온 첫 번째 요소 (예: <section>, <li> 등)를 element로 설정
    this.element = importedNode.firstElementChild as U;
    // 5. 새 요소에 ID 부여 (전달된 경우에만)
    if (newElementId) {
      this.element.id = newElementId;
    }
    // 6. 생성된 element를 hostElement에 삽입 (앞/뒤 여부는 insertAtStart로 결정)
    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  // 이 두 메서드는 Component를 상속하는 클래스가 반드시 구현해야 함
  abstract configure(): void;
  abstract renderContent(): void;
}
