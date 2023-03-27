import React from "react";
import { Product } from "../../../Models/Product";

export const ListView = ({ products }: { products: Product[] }) => {
  return (
    <table className="table">
      <thead>
        <TableHeaders />
      </thead>
      <tbody>
        <TableData products={products} />
      </tbody>
    </table>
  );
};

const TableHeaders = () => {
  return (
    <tr>
      <th scope="col">#</th>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Product Number</th>
      <th scope="col">Unit number</th>
      <th scope="col">Price</th>
    </tr>
  );
};

const priceStyle = { background: "clear", minWidth: "90px" };

const TableData = ({ products }: { products: Product[] }) => {
  return (
    <>
      {products.map((item, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.productId}</td>
            <td>{item.name}</td>
            <td>{item.productNumber}</td>
            <td>{item.unitPrice}</td>
            <td style={priceStyle}>{`${item.price} kr`}</td>
          </tr>
        );
      })}
    </>
  );
};
