import React from "react";
import { log } from "../consoleHelper";
import { COLLECTION } from "../Constants";
import { db } from "../iSnittFirebase";
import { Product } from "../Models/Product";
import { LoggerRepo } from "../Repositories/LoggerRepo";

export class ProductService {
  /**
   * Fetch products from firebase database
   */
  static getProducts = async (): Promise<Product[] | undefined> => {
    try {
      const docs = await db.collection(COLLECTION.PRODUCTS).get();

      const products: Product[] = [];
      docs.forEach((doc: firebase.firestore.DocumentData) => {
        const product = doc.data() as Product;
        product.productId = parseInt(doc.id);
        products.push(product);
      });

      return products;
    } catch (error) {
      log(error);
      LoggerRepo.error("Failed to get products from Firebase");
    }
  };

  /**
   * Set products to firebase database
   */
  static setProducts = (products: Product[]) => {
    const batch = db.batch();

    // set data to batch
    products.forEach((product) => {
      const docRef = db
        .collection(COLLECTION.PRODUCTS)
        .doc(product.productId.toString());

      batch.set(
        docRef,
        {
          name: product.name,
          unitPrice: product.unitPrice,
          active: product.active,
          productNumber: product.productNumber || null,
          vatType: product.vatType,
          price: product.price,
        },
        { merge: true }
      );
    });

    // update batch in database
    batch
      .commit()
      .then(() => {
        LoggerRepo.info("Batch with products updated successfully");
      })
      .catch((error) => {
        LoggerRepo.error(error);
        LoggerRepo.error("Failed to create products " + JSON.stringify(error));
      });
  };
}
