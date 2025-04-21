import { Project, ProjectStatus } from "../models/project.js";

// 리스너 함수 타입 정의: Project 배열을 받아서 아무것도 반환하지 않는 함수
type Listener<T> = (items: T[]) => void;

// 전역 상태 클래스의 베이스 (제네릭)
// 여러 상태 클래스에서 공통으로 사용 가능
class State<T> {
  protected listeners: Listener<T>[] = []; // protected: 상속 클래스에서 접근 가능

  // 외부에서 상태 변경 감지용 리스너 등록
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

// Project 전용 상태 관리 클래스 (Singleton + Observer 패턴)
export class ProjectState extends State<Project> {
  // 현재 등록된 프로젝트들을 저장하는 배열
  private projects: Project[] = [];
  // ProjectState 클래스의 유일한 인스턴스를 저장할 정적 속성
  private static instance: ProjectState;

  // 생성자를 private으로 선언함으로써 외부에서 new ProjectState() 불가
  // -> Singleton 패턴을 유지하기 위해서
  private constructor() {
    super();
  }

  // ProjectState의 유일한 인스턴스를 반환하는 정적 메서드
  // 이미 만들어졌으면 기존 인스턴스를 반환하고, 없으면 새로 만들어서 저장 후 반환
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  // 프로젝트 추가 시 상태 갱신 & 등록된 모든 리스너에 알림
  // title, description, 인원 수를 받아서 프로젝트 객체를 만들고, projects 배열에 추가
  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active // 초기 상태는 Active
    );

    // 프로젝트 배열에 새로운 프로젝트 추가
    this.projects.push(newProject);

    // 모든 리스너 함수 실행 (프로젝트 배열의 복사본 전달)
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);

    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  // 모든 리스너 함수 실행 (프로젝트 배열의 복사본 전달)
  // -> slice()를 사용하는 이유: 원본 배열을 외부에서 변경하지 못하도록 하기 위해
  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // 변경 감지용으로 콜백 함수 실행
    }
  }
}

console.log('RUNNING project-state.ts...');

// 상태를 다루는 전역변수를 하나 만들어 준다.
export const projectState = ProjectState.getInstance();
