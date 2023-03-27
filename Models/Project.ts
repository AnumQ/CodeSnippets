import React from "react";
import { Contact } from "./Contact";
import { Product } from "./Product";

export interface Project {
  projectId: number;
  name: string;
  completed: boolean;
  products: Product[];
  contact: Contact;
}
