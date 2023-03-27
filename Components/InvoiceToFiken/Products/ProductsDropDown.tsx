import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Product } from "../../../Models/Product";
import _ from "lodash";
import { ProductLine, ProductLineParser } from "../../../Models/ProductLine";
import { SelectedProducts } from "./SelectedProducts";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { ProductService } from "../../../Services/ProductService";
import { LoggerRepo } from "../../../Repositories/LoggerRepo";
import { ProjectService } from "../../../Services/ProjectService";
import { log } from "../../../consoleHelper";
const RABATT_PRODUCT_ID = 805517752;
const BILDE_PAKKE_TIL_AVTALT_PRIS_PRODUCT_ID = 1377345955;
const TILLEGG_ETTER_AVTALE_PRODUCT_ID = 876141285;

export const ProductsDropDown = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productLines, setProductLines] = useState<ProductLine[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const defaultQuantityRange = Array.from({ length: 15 }, (_, i) => i + 1);
  const [quantityOptions, setQuantityOptions] = useState(defaultQuantityRange);
  const { invoice, setProductLines: setProductLinesOnInvoice } = useInvoice();

  useEffect(() => {
    if (invoice.projectId) {
      fetchProjectAndSetProducts(invoice.projectId.toString());
    } else {
      setProducts(allProducts);
    }
  }, [invoice]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setQuantity(quantityOptions[0]);
  }, [quantityOptions]);

  useEffect(() => {
    if (selectedProduct?.productId === RABATT_PRODUCT_ID) {
      setQuantityOptions([-1]);
    } else if (
      selectedProduct?.productId === BILDE_PAKKE_TIL_AVTALT_PRIS_PRODUCT_ID
    ) {
      setQuantityOptions([1]);
    } else {
      setQuantityOptions(defaultQuantityRange);
    }
  }, [selectedProduct]);

  useEffect(() => {
    setProductLinesOnInvoice(productLines);
  }, [productLines]);

  async function fetchData() {
    const data = await ProductService.getProducts();

    if (!data) {
      return LoggerRepo.error(`${productsError} ${data}`);
    }
    setAllProducts(data);
    setProducts(data);
  }

  async function fetchProjectAndSetProducts(projectId: string) {
    const data = await ProjectService.getProject(projectId);
    if (!data) {
      return LoggerRepo.error(`${projectsError} ${data}`);
    }

    if (data.products && data.products.length > 0) {
      setProducts(data.products);
    } else {
      setProducts(allProducts);
    }
  }

  const removeProductLine = (productLine: ProductLine) => {
    const removed = _.reject(productLines, productLine);
    setProductLines(removed);
  };

  const handleSelectedProduct = (selectedProducts: Product[]) => {
    const selected = selectedProducts.length > 0 ? selectedProducts[0] : null;
    setSelectedProduct(selected);
  };

  const handleSetUnitPrice = (
    e: React.ChangeEventHandler<FormControlElement>
  ) => {
    const newUnitPrice = parseInt(e.target.value);
    if (selectedProduct) {
      const newSelectedProduct = { ...selectedProduct };
      newSelectedProduct.unitPrice = newUnitPrice * 100;
      newSelectedProduct.price = newUnitPrice * 1.25;
      setSelectedProduct(newSelectedProduct);
    }
  };

  const handleSetPrice = (
    e: React.ChangeEventHandler<FormControlElement>
  ): void => {
    const newPrice = parseInt(e.target.value);
    if (selectedProduct) {
      const newSelectedProduct = { ...selectedProduct };
      newSelectedProduct.price = newPrice;
      newSelectedProduct.unitPrice = (newPrice * 100) / 1.25;
      setSelectedProduct(newSelectedProduct);
    }
  };

  const isProductPriceOverrideAllowed = () => {
    return (
      selectedProduct &&
      (selectedProduct.productId === RABATT_PRODUCT_ID ||
        selectedProduct.productId === TILLEGG_ETTER_AVTALE_PRODUCT_ID ||
        selectedProduct.productId === BILDE_PAKKE_TIL_AVTALT_PRIS_PRODUCT_ID)
    );
  };

  return (
    <>
      <Form style={{ marginTop: "1rem" }}>
        <Form.Group id="ListProducts">
          <Form.Label>
            <b>Velg Produkt</b>
          </Form.Label>
          <Typeahead
            id="product-list"
            options={products}
            defaultSelected={products.filter((option: Product) =>
              invoice.lines.forEach((line: ProductLine) => {
                line.productId === option.productId;
              })
            )}
            labelKey={(option) => `${option.name}`}
            placeholder="Velg/Søk i produkter"
            onChange={handleSelectedProduct}
          />

          {isProductPriceOverrideAllowed() ? (
            // Do not move this into separate component. The cursor will jump out of the field
            <div style={formWrapper}>
              <br />
              <Form.Group id="PriceExcludedMVA">
                <Form.Label>
                  <b>Pris eks MVA:</b>
                </Form.Label>
                <Form.Control
                  style={{ width: "100%" }}
                  id="UnitPrice"
                  as="input"
                  type="number"
                  value={selectedProduct!.unitPrice / 100}
                  onChange={handleSetUnitPrice}
                ></Form.Control>
              </Form.Group>
              <div
                style={{
                  marginLeft: "2rem",
                }}
              >
                <Form.Group id="PriceIncludedMVA">
                  <Form.Label>
                    <b>Pris inkl MVA:</b>
                  </Form.Label>
                  <Form.Control
                    style={{ width: "100%" }}
                    id="Price"
                    as="input"
                    type="number"
                    value={selectedProduct!.price}
                    onChange={handleSetPrice}
                  ></Form.Control>
                </Form.Group>
              </div>
            </div>
          ) : null}
        </Form.Group>
        <Form.Group controlId="SelectQuantity">
          <Form.Label>Antall</Form.Label>
          <Form.Control
            as="select"
            custom
            onChange={(e) => {
              const numberText = e.target.value;
              setQuantity(parseInt(numberText));
            }}
          >
            {quantityOptions.map((value: number, index: number) => {
              return (
                <option key={index} value={value}>
                  {value}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Button
          disabled={!selectedProduct}
          variant="primary"
          onClick={() => {
            if (selectedProduct) {
              const itemInList = isProductInList(productLines, selectedProduct);

              if (!itemInList) {
                const productLine = ProductLineParser.parse(selectedProduct);
                productLine.quantity = quantity;
                setProductLines((prev) => {
                  return [...prev, productLine];
                });
              }
            }
          }}
        >
          Legg til produkt
        </Button>
      </Form>
      <br />
      <SelectedProducts
        productLines={productLines}
        removeProductLine={removeProductLine}
      />
    </>
  );
};

function isProductInList(
  productLines: ProductLine[],
  selectedProduct: Product
) {
  let itemInList = false;
  productLines.forEach((pl) => {
    if (pl.productId === selectedProduct.productId) {
      itemInList = true;
      alert("Produktet er allerede er lagt til");
      return;
    }
  });
  return itemInList;
}

const formWrapper = {
  marginTop: "1rem",
  display: "flex",
};

const productsError = "ListProducts: Products error";
const projectsError = "ListProducts: Projects error";
