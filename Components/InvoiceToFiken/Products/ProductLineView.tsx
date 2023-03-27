import React from "react";
import { FaTimes } from "react-icons/fa";
import { ProductLine } from "../../../Models/ProductLine";

/**
 * View to render the Product Line in Invoice
 */
export const ProductLineView = ({
  name,
  quantity,
  price,
  fontWeightBold = true,
  productLine,
  removeProductLine,
}: {
  name: string;
  quantity: string;
  price: string;
  fontWeightBold?: boolean;
  productLine?: ProductLine;
  removeProductLine?: (productLine: ProductLine) => void;
}) => {
  const container = {
    height: "2.5rem",
    background: "#efefef",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem",
    borderRadius: "5px",
    margin: "0.2rem",
  };
  const priceStyle = {
    background: "clear",
    width: "30%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  };

  const fontweight = fontWeightBold ? "bold" : "normal";
  const isProductLine = productLine && removeProductLine;

  return (
    <div style={container}>
      <div style={{ background: "clear", width: "60%" }}>
        <div
          style={{
            textAlign: "left",
            fontWeight: fontweight,
          }}
        >
          {name}
        </div>
      </div>
      <div style={{ background: "clear", width: "20%" }}>
        <div style={{ float: "right", fontWeight: fontweight }}>{quantity}</div>
      </div>
      <div style={priceStyle}>
        <div style={{ textAlign: "center", fontWeight: fontweight }}>
          {price} kr
        </div>
      </div>
      <div style={{ background: "clear", width: "5%" }}>
        {isProductLine ? (
          <button
            style={{ display: "flex", background: "none", border: "0px" }}
            onClick={() => {
              if (productLine && removeProductLine) {
                removeProductLine(productLine);
              }
            }}
          >
            <FaTimes />
          </button>
        ) : null}
      </div>
    </div>
  );
};
