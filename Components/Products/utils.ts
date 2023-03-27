import React from "react";
import { Product } from "../../Models/Product";

export const sortProductByName = (list: Product[]) => {
  return list.sort((a, b) => a.name.localeCompare(b.name));
};
