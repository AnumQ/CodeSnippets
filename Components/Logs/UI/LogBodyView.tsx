import React from "react";
import { LOG } from "../../../Constants";
import { Log } from "../../../Models/Log";

export const LogBodyView = ({ log }: { log: Log }) => {
  return <SwitchLogViewBasedOnType log={log} />;
};

const SwitchLogViewBasedOnType = (props: { log: Log }) => {
  const log = props.log;
  switch (log.type) {
    case LOG.TYPE.INVOICE_DRAFT_CREATED:
      return <InvoiceLogView log={log} />;
    case LOG.TYPE.CONTACT_CREATED:
      return <ContactLogView log={log} />;
    default:
      return <div>Log type: {log.type}</div>;
  }
};

const ContactLogView = ({ log }: { log: Log }) => {
  return (
    <>
      <li>
        Booking kode: <b>{log.bookingCode}</b>
      </li>
      <li>
        Navn: <b>{log.contactName}</b>
      </li>
      <li>Email: {log.contactEmail}</li>
      <li>
        Addresse: {log.address}, {log.postCode}
      </li>
    </>
  );
};

// THIS IS A DUMB Component
const InvoiceLogView = ({ log }: { log: Log }) => {
  return (
    <>
      <li>
        Booking kode: <b>{log.bookingCode}</b>
      </li>
      <li>
        Addresse: {log.address}, {log.postCode}
      </li>
    </>
  );
};
