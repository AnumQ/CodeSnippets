import React from "react";
import { Product } from "./Product";

export interface ProductLine {
  productId: number;
  description: string;
  unitPrice: number;
  vatType: string;
  quantity: number;
  discount: number;
  incomeAccount: number;
}

export class ProductLine {
  productId: number;
  description: string;
  unitPrice: number;
  vatType: string;
  quantity: number;
  incomeAccount: number;
  price: number;

  constructor(
    productId: number,
    description: string,
    unitPrice: number,
    vatType: string,
    incomeAccount: number,
    price: number
  ) {
    this.productId = productId;
    this.description = description;
    this.unitPrice = unitPrice;
    this.vatType = vatType;
    this.incomeAccount = incomeAccount;
    this.price = price;
    this.quantity = 1;
  }
}

export class ProductLineParser {
  static parse(product: Product): ProductLine {
    return new ProductLine(
      product.productId,
      product.name,
      product.unitPrice,
      product.vatType,
      parseInt(product.incomeAccount),
      product.price
    );
  }
}
