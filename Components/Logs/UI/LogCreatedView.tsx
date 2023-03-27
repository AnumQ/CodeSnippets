import React from "react";
import { Log } from "../../../Models/Log";
import { getReadableDate } from "../../DateHelper";

export const LogCreatedView = ({ log }: { log: Log }) => {
  return (
    <div style={{ background: "clear", textAlign: "end" }}>
      <DateView date={log.created.toDate()} />
    </div>
  );
};

const DateView = ({ date }: { date: Date }) => {
  return <a style={{ fontSize: "12px" }}>{getReadableDate(date)}</a>;
};
