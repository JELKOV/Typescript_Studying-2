// Validation 로직
// 객체구조부터 설정을 하고싶은데, 응집도를 높이기 위해서 interface
export interface Validatable {
  value: string | number;
  // value 이외의 것들은 선택적으로 만들고 싶다.
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

// validate() 함수: 유효성 검사 수행
export function validate(validatableInput: Validatable): boolean {
  // 전체 유효성 결과를 누적할 플래그 (기본은 true)
  let isValid = true;

  // 1. required: 값이 반드시 존재해야 함 (빈 문자열, 공백, null 등은 실패)
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    // 문자열로 변환 후 공백 제거 → 길이가 0이면 유효하지 않음
  }

  // 2. minLength: 문자열 최소 길이 조건 (예: 최소 5자 이상)
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }

  // 3. maxLength: 문자열 최대 길이 조건 (예: 최대 100자 이하)
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }

  // 4. min: 숫자의 최소값 조건 (예: 최소 1 이상)
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }

  // 5. max: 숫자의 최대값 조건 (예: 최대 10 이하)
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  // 모든 조건을 만족해야만 최종적으로 true 반환
  return isValid;
}
