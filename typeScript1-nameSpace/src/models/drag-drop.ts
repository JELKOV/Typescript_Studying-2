// Drag & Drop Interface
// nameSpace에서 그냥 빼서 쓸수 없고 export를 해야한다.
namespace App {
  // 드레그가 가능한 요소를 설정
  export interface Draggable {
    dragStartHandler(event: DragEvent): void; // 드레그의 시작시 실행
    dragEndHandler(event: DragEvent): void; // 드레그의 종료시 실행
  }

  // 드롭이 가능한 대상을 설정
  export interface DragTarget {
    dragOverHandler(event: DragEvent): void; // 드롭 허용 표시
    dropHandler(event: DragEvent): void; // 실제로 드롭이 일어났을때
    dragLeaveHandler(event: DragEvent): void; // 요소 밖으로 벗어났을때
  }
}
