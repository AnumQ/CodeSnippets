import React from "react";

/**
 * Interface of a subset fields from Provider obj in Simplybook
 */
export interface Provider {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export class Provider {
  id: number;
  name: string;
  email: string;
  phone: string;

  constructor(id: number, name: string, email: string, phone: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}
