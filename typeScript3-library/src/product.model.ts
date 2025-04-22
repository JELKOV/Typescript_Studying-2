import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class Product {
  @IsNotEmpty() // 빈 문자열이 아니어야 함
  title: string;

  @IsNumber() // 숫자여야 함
  @IsPositive() // 양수여야 함
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getInformation() {
    return [this.title, `$${this.price}`];
  }
}
