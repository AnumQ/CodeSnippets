import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { formatPrice } from "../../../formatter/formatter";
import { ProductLine } from "../../../Models/ProductLine";
import { ProductLineView } from "./ProductLineView";

export const SelectedProducts = ({
  productLines,
  removeProductLine,
}: {
  productLines: ProductLine[];
  removeProductLine: (productLine: ProductLine) => void;
}) => {
  const renderSelectedProduct = (productLine: ProductLine, index: number) => {
    const name = productLine.description;
    const quantity = productLine.quantity;
    const price = `${formatPrice(productLine.quantity * productLine.price)}`;
    return (
      <div key={index + productLine.description}>
        <ProductLineView
          key={name}
          name={name}
          quantity={quantity.toString()}
          price={price}
          fontWeightBold={false}
          productLine={productLine}
          removeProductLine={removeProductLine}
        />
      </div>
    );
  };

  const totalQuantity = productLines
    .map((productLine) => productLine.quantity)
    .reduce((a, b) => a + b, 0)
    .toString();

  const totalPrice = formatPrice(
    productLines
      .map((productLine) => productLine.price * productLine.quantity)
      .reduce((a, b) => a + b, 0)
  );

  return (
    <>
      <ProductLineView
        key={"PLVUniqe"}
        name="Navn"
        quantity="Antall"
        price="Pris"
      />
      {productLines.map(renderSelectedProduct)}
      <ProductLineView
        key={"PLVSum"}
        name="Sum"
        quantity={totalQuantity}
        price={totalPrice}
      />
    </>
  );
};
