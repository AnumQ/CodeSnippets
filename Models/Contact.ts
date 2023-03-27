import React from "react";

export interface Contact {
  contactId: number;
  name: string;
  email: string;
  organizationNumber: string;
  customerNumber: number;
  customerAccountCode: string;
  phoneNumber: string;
  memberNumber: number;
  daysUntilInvoicingDueDate: number;
  customer: boolean;
  supplier: boolean;
  inactive: boolean;
}
