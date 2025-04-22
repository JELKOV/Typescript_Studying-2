// import _ from "lodash";

// declare var GLOBAL: string;

// console.log(_.shuffle([1, 2, 3]));

// console.log(GLOBAL);

// 메타데이터 사용을 위한 필수 import (반드시 상단에 있어야 함)
import "reflect-metadata";

import { validate } from "class-validator";
// plain object -> 클래스 인스턴스로 변환하는 함수
import { plainToInstance } from "class-transformer";
import { Product } from "./product.model";

// 서버에서 받은 일반 객체 배열 (JSON 형태)
const products = [
  { title: "A Carpet", price: 29.99 },
  { title: "A Book", price: 10.99 },
];


// --------------------------------------
// 과거 방식: 수동으로 클래스 인스턴스를 생성
// --------------------------------------

const manuallyLoadedProducts = products.map(prod => {
  // JSON 객체 → 클래스 인스턴스로 직접 변환
  return new Product(prod.title, prod.price);
});

// 클래스 메서드도 사용할 수 있음
console.log("수동 변환 결과:");
manuallyLoadedProducts.forEach(p => console.log(p.getInformation()));


// --------------------------------------
// 현재 방식: class-transformer로 자동 변환
// --------------------------------------

// plainToInstance: 클래스 타입과 JSON 배열을 전달하면 내부적으로 map + new Product(...) 자동 수행
const loadedProducts = plainToInstance(Product, products);

// 클래스 인스턴스로 변환되었기 때문에 메서드 사용 가능
console.log("자동 변환 결과:");
loadedProducts.forEach(p => console.log(p.getInformation()));


// 유효성에 실패할 객체 생성
const newProd = new Product("", -5.99);

// getInformation()은 정상 작동
console.log(newProd.getInformation());

// 유효성 검사 실행
validate(newProd).then(errors => {
  if (errors.length > 0) {
    console.log("유효성 검사 실패:");
    console.log(errors); // 오류 상세 정보 배열
  } else {
    console.log("유효성 통과");
  }
});
