import React from "react";

export interface Product {
  productId: number;
  name: string;
  unitPrice: number;
  incomeAccount: string;
  productNumber: string;
  vatType: string;
  active: boolean;
  price: number; //
}
