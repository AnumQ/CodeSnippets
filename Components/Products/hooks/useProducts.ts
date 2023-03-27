import React, { useEffect, useState } from "react";
import { useLoading } from "../../../Hooks/useLoading";
import { Product } from "../../../Models/Product";
import { LoggerRepo } from "../../../Repositories/LoggerRepo";
import { ProductService } from "../../../Services/ProductService";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { isLoading: productsLoading, setIsLoading: setProductsLoading } =
    useLoading(false);
  const { isLoading: isImporting, setIsLoading: setIsImporting } =
    useLoading(false);

  useEffect(() => {
    async function fetchData() {
      setProductsLoading(true);
      const products = await ProductService.getProducts();
      setProductsLoading(false);
      if (!products) {
        return LoggerRepo.error(`Products are ${products}`);
      }
      setProducts(products);
    }

    fetchData();
  }, []);

  const importProducts = () => {
    setIsImporting(true);
    AccountService.getProducts((data) => {
      setIsImporting(false);
      ProductService.setProducts(data as Product[]);
      setProducts(data);
      alert(successAlert);
    });
  };

  return { products, importProducts, productsLoading, isImporting };
};

const successAlert = "Imported products from Accounting successfully";
