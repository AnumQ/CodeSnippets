import React from "react";

export interface Service {
  id: number;
  name: string;
}

export class Service {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
