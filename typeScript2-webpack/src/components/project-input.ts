import Component from "./base-component";
import * as Validation from "../util/validation";
import { Autobind as Abind } from "../decorators/autobind";
import { projectState } from "../state/project-state";

// 클래스: ProjectInput
// - 목적: <template> 안의 form을 <div id="app">에 렌더링하기 위한 구성 요소
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    // 폼을 실제 DOM에 렌더링 - 생성자에서 호출하여 자동 렌더링
    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent(): void {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    // 유효성 검사

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validation.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };
    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(peopleValidatable)
    ) {
      alert("Not Valid Input value, Try input again");
      return; //void 반환
    }
    // input에서 기본적으로 추출하는 값은 TEXT입니다 -> 그래서 enteredPeople + 를 붙여서 Number화 시켜줘야 합니다.
    return [enteredTitle, enteredDescription, +enteredPeople];
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Abind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    // Tuple : 배열의 일종인데 고정된 배열 !!
    // 런타임에서는 자바스크립트 코드가 돌아가기 때문에 튜플이 아니라 배열로 검사해야 한다.
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
