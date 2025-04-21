/// <reference path ="base-component.ts"/>
/// <reference path ="../decorators/autobind.ts"/>
/// <reference path ="../state/project-state.ts"/>
/// <reference path ="../models/project.ts"/>
/// <reference path ="../models/drag-drop.ts"/>

namespace App {
  // 클래스: ProjectList
  // - 목적: 프로젝트 리스트를 랜더링 하기 위한 클래스
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);

      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    @Autobind
    dragOverHandler(event: DragEvent) {
      // 드래그 중 전달된 데이터가 있고, 형식이 'text/plain'인지 확인
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        // 브라우저 기본 동작을 막아 drop 이벤트가 발생할 수 있도록 허용
        event.preventDefault();

        // 이 요소 내부의 <ul>을 선택 (드롭 영역이 될 리스트)
        const listEl = this.element.querySelector("ul")!;
        // 드롭 가능 상태임을 시각적으로 보여주기 위해 클래스 추가 (배경색 등 효과)
        listEl.classList.add("droppable");
      }
    }

    @Autobind
    dropHandler(event: DragEvent) {
      const prjId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        prjId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    @Autobind
    dragLeaveHandler(_: DragEvent) {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);

      // ProjectState에 리스너 함수 등록
      // 프로젝트 배열에 변경이 생기면 아래 함수가 자동 실행됨
      // 프로젝트 상태 변경을 감지하고, 해당 상태의 리스트만 렌더링하기 위한 리스너 함수 등록
      projectState.addListener((projects: Project[]) => {
        // 전체 프로젝트 배열 중에서 현재 리스트(this.type)에 맞는 항목만 필터링
        const relevantProjects = projects.filter((prj) => {
          // 현재 ProjectList의 타입이 'active'인 경우
          if (this.type === "active") {
            // 상태가 ProjectStatus.Active인 프로젝트만 유지
            return prj.status === ProjectStatus.Active;
          }
          // 위 조건이 아니라면 'finished' 리스트임 → 상태가 Finished인 프로젝트만 유지
          return prj.status === ProjectStatus.Finished;
        });

        this.assignedProjects = relevantProjects; // 필터링된 프로젝트만 리스트에 할당 (렌더링 대상 지정)
        this.renderProjects(); // 실제 화면에 리스트 렌더링 (ul 요소에 <li>로 추가)
      });
    }

    renderContent() {
      // 1. 리스트에 고유한 ID 부여 (ex: "active-projects-list", "finished-projects-list")
      // this.type은 'active' 또는 'finished' 이므로 템플릿 문자열로 고유 ID 생성
      const listId = `${this.type}-projects-list`;

      // 2. <section> 내부의 <ul> 요소 선택 후, 위에서 만든 고유 ID를 부여
      this.element.querySelector("ul")!.id = listId; // '!'는 null이 아님을 보장하는 non-null assertion operator

      // 3. <section> 내부의 <h2> 요소를 선택해 헤딩 텍스트 설정
      // "ACTIVE PROJECTS" 또는 "FINISHED PROJECTS" 식으로 텍스트 삽입
      this.element.querySelector("h2")!.textContent =
        this.type.toUpperCase() + " PROJECTS";
    }

    private renderProjects() {
      // DOM에서 현재 리스트의 <ul> 요소를 가져옴
      const listEl = document.getElementById(
        `${this.type}-projects-list`
      )! as HTMLUListElement;

      // 중복 방지를 위해 초기화
      listEl.innerHTML = "";

      // 현재 상태에 저장된 프로젝트 목록을 하나씩 반복
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
      }
    }
  }
}
