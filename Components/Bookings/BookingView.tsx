import React, { useEffect } from "react";
import { Booking } from "../../Models/Booking";
import { AdditionalField } from "../../Models/BookingDetails/IntakeForm";
import _ from "lodash";
import { Comments } from "./Comments/Comments";
import { BookingLogs } from "./BookingLogs";
import { BookingMenu } from "./BookingMenu";

export const BookingView = ({ booking }: { booking: Booking }) => {
  const { setInvoiceDetails } = useInvoice();

  useEffect(() => {
    setInvoiceDetails(booking);
  }, []);

  return (
    <div>
      <BookingMenu booking={booking} />
      <div className="mt-3">
        <table className="table">
          <thead>
            <TableHeaders />
          </thead>
          <tbody>{[booking].map(renderBooking)}</tbody>
        </table>
        <Comments booking={booking} />
        <BookingLogs bookingCode={booking.code} />
        <div>
          <h5>IntakeForm [{booking.code}]</h5>
          {booking.intakeForm.map(renderIntakeForm)}
        </div>
      </div>
    </div>
  );
};

const TableHeaders = () => {
  return (
    <tr>
      <th scope="col">#</th>
      <th scope="col">Id</th>
      <th scope="col">Status</th>
      <th scope="col">Record Date</th>
      <th scope="col">Provider</th>
      <th scope="col">Service</th>
      <th scope="col">Client</th>
      <th scope="col">Created By</th>
    </tr>
  );
};

const renderIntakeForm = (field: AdditionalField, index: number) => {
  const isCheckboxSelected = index === 0 && field.value === "1";
  const className = isCheckboxSelected
    ? "row pb-3 pt-3 bg-warning"
    : "row pb-3 pt-3";
  return (
    <div
      className={className}
      key={index}
      style={{
        borderBottom: "1px solid lightgray",
        borderTop: index === 0 ? "1px solid lightgray" : "0",
      }}
    >
      <div className="col">{field.field_name}</div>
      <div className="col">{isCheckboxSelected ? "Ja" : field.value}</div>
    </div>
  );
};

const renderBooking = (booking: Booking, index: number) => {
  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{booking.id}</td>
      <td>{booking.status}</td>
      <td>{booking.record_date}</td>
      <td>
        {booking.provider.name}
        <br />
        {booking.provider.email}
      </td>
      <td>{booking.service.name}</td>
      <td>
        {booking.client?.name}
        <br />
        {booking.client?.email}
        <br />
        {booking.client?.phone}
      </td>
      <td>{booking.createdBy}</td>
    </tr>
  );
};
