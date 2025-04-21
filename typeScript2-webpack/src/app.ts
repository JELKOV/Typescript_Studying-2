import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";


// 클래스 인스턴스 생성: 폼 자동 렌더링 시작됨
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");