import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";


// 클래스 인스턴스 생성: 폼 자동 렌더링 시작됨
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
