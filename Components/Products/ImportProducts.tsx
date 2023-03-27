import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Spinner } from "../UI/Spinner";
import { useProducts } from "./hooks/useProducts";

export const ImportProducts = () => {
  const { importProducts, isImporting } = useProducts();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, []);

  return (
    <div>
      {isMounted ? (isImporting ? (
        <Spinner fullHeight={false} />
      ) : (
        <Button onClick={importProducts}>Import Products</Button>
      )) : null}
    </div>
  );
};
