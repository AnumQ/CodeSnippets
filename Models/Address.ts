import React from "react";
import { INTAKE_FORM } from "../Constants";
import { AdditionalField } from "./BookingDetails/IntakeForm";

export interface Address {
  streetAddress: string;
  streetAddressLine2: string;
  postCode: string;
  city: string;
  country: string;
}

export class Address {
  constructor(intakeForm: AdditionalField[]) {
    this.streetAddress =
      intakeForm?.filter(
        (field) => field.field === INTAKE_FORM.SELLER_ADDRESS_FIELD_ID
      )[0].value ?? "";

    this.postCode =
      intakeForm?.filter(
        (field) => field.field === INTAKE_FORM.SELLER_POSTAL_CODE_FIELD_ID
      )[0].value ?? "";

    this.city = "Oslo";
    this.country = "Norge";
  }
}
