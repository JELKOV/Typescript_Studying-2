/// <reference path ="base-component.ts"/>
/// <reference path ="../decorators/autobind.ts"/>
/// <reference path ="../models/project.ts"/>
/// <reference path ="../models/drag-drop.ts"/>

namespace App {
  //ProjectItem Class
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    // <부모요소 어디에, 무슨 요소>
    private project: Project;

    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);
      // 데이터 객체를 인스턴스 필드
      this.project = project;

      this.configure();
      this.renderContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent) {
      // 드래그되는 요소의 식별자(ID)를 텍스트 형태로 저장
      event.dataTransfer!.setData("text/plain", this.project.id);
      // 커서에 이동 효과 부여 (복사와 구분됨)
      event.dataTransfer!.effectAllowed = "move";
    }

    @Autobind
    dragEndHandler(_: DragEvent) {
      console.log("Drag End!");
    }

    configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector(
        "h3"
      )!.textContent = `${this.persons} assigned`;
      this.element.querySelector("p")!.textContent = this.project.description;
    }

    private get persons() {
      if (this.project.people === 1) {
        return "1 person";
      }
      return `${this.project.people} persons`;
    }
  }
}
