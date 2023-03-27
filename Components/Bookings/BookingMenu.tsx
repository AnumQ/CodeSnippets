import React from "react";
import { Button } from "react-bootstrap";
import { Booking } from "../../Models/Booking";

export const BookingMenu = ({ booking }: { booking: Booking }) => {
  return (
    <div
      className="mt-3"
      style={{ display: "flex", justifyContent: "flex-end" }}
    >
      <InvoiceToClient booking={booking} />
      <InvoiceToOffice booking={booking} />
    </div>
  );
};
