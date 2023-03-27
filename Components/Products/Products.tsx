import React, { useEffect, useState } from "react";
import { log } from "../../consoleHelper";
import { Container, Menu } from "../UI/shared";
import { Spinner } from "../UI/Spinner";
import { useProducts } from "./hooks/useProducts";
import { ImportProducts } from "./ImportProducts";
import { ListView } from "./UI/ListView";

/**
 * Display Products from iSNITT DATBASE
 */
export const Products = () => {
  const { productsLoading, products } = useProducts();

  const PageMenu = () => {
    return (
      <Menu>
        <ImportProducts />
      </Menu>
    );
  };

  return (
    <Container>
      <PageMenu />
      {!productsLoading ? <ListView products={products} /> : <Spinner />}
    </Container>
  );
};
