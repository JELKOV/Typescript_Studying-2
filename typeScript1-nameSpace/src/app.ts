/// <reference path ="components/project-item.ts"/>
/// <reference path ="components/project-list.ts"/>
/// <reference path ="components/project-input.ts"/>

namespace App {

  // 클래스 인스턴스 생성: 폼 자동 렌더링 시작됨
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
