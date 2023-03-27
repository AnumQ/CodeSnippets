import React from "react";
import { INTAKE_FORM } from "../Constants";
import { AdditionalField } from "./BookingDetails/IntakeForm";
import { Client } from "./Client";
import { Provider } from "./Provider";
import { Seller } from "./Seller";
import { Service } from "./Service";
import firebase from "firebase/app";
import { log } from "../consoleHelper";

export interface Booking {
  id: number;
  code: string;
  status: string;
  record_date: string;
  provider: Provider;
  service: Service;
  start_datetime: string;
}
/**
 * Booking contains fields from BookingReport and BookingDetails
 * Data is manipulated/picked from the BookingReport and BookingDetails to prepare for view
 * Contains all the info needed to display booking in portal before sending to invoice system
 */
export class Booking {
  id: number;
  code: string;
  status: string;
  record_date: string;
  provider: Provider;
  service: Service;
  client: Client;
  createdBy: string;
  intakeForm: AdditionalField[];
  start_datetime: string;

  //fields from intakeForm
  seller: Seller;
  assignmentNo: string;
  invoiceText: string;
  agentOffice: string;

  constructor(
    id: number,
    code: string,
    status: string,
    record_date: string,
    provider: Provider,
    service: Service,
    client: Client,
    createdBy: string,
    intakeForm: AdditionalField[],
    start_datetime: string,
    end_datetime: string
  ) {
    this.id = id;
    this.code = code;
    this.status = status;
    this.record_date = record_date;
    this.provider = provider;
    this.service = service;
    this.client = client;
    this.createdBy = createdBy;
    this.intakeForm = intakeForm;
    this.seller = new Seller(intakeForm);

    this.assignmentNo = this.getAssignmentNo(intakeForm);
    const { addressFieldname, address, postalCode } =
      this.setInvoiceText(intakeForm);
    const end_date = this.getEndDate(end_datetime);
    this.invoiceText = this.getInvoiceText(
      addressFieldname,
      address,
      postalCode,
      end_date
    );
    this.agentOffice = this.getAgentOffice(intakeForm);
    this.start_datetime = start_datetime;
  }

  private getAgentOffice(intakeForm: AdditionalField[]): string {
    return intakeForm.filter(
      (field) => field.field === INTAKE_FORM.AGENT_OFFICE_FIELD_ID
    )[0].value;
  }

  private getInvoiceText(
    addressFieldname: string,
    address: string,
    postalCode: string,
    end_date: string
  ): string {
    return `${addressFieldname} ${address}, ${postalCode}\n\nBooking kode fra iSnitt: ${this.code}\n\nFotografering utført: ${end_date}`;
  }

  private getAssignmentNo(intakeForm: AdditionalField[]) {
    return (
      intakeForm.filter(
        (field) => field.field === INTAKE_FORM.ASSIGNMENT_NO_FIELD_ID
      )[0].value ?? ""
    );
  }

  private setInvoiceText(intakeForm: AdditionalField[]) {
    const addressFieldname = intakeForm.filter(
      (field) => field.field === INTAKE_FORM.ASSIGNMENT_ADDRESS_FIELD_ID
    )[0].field_name;
    const address = intakeForm.filter(
      (field) => field.field === INTAKE_FORM.ASSIGNMENT_ADDRESS_FIELD_ID
    )[0].value;
    const postalCode = intakeForm.filter(
      (field) => field.field === INTAKE_FORM.ASSIGNMENT_POSTAL_CODE_FIELD_ID
    )[0].value;

    return { addressFieldname, address, postalCode };
  }

  private getEndDate(end_datetime: string): string {
    const end_datetime_object = new Date(end_datetime);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    const dateTimeFormat = new Intl.DateTimeFormat("no-NO", options);
    const formatted = dateTimeFormat.format(end_datetime_object);
    return formatted;
  }
}
