import React from "react";
import { LOG } from "../../../Constants";
import { Log } from "../../../Models/Log";
import { LogTitleList } from "../../UI/Card";

const INVOICE_DRAFT_CREATED_TITLE = "Lorem epsum";
const CONTACT_CREATED_TITLE = "Lorepm epsum";

export const LogTitleView = ({ log }: { log: Log }) => {
  const getLogTitle = () => {
    switch (log.type) {
      case LOG.TYPE.INVOICE_DRAFT_CREATED:
        return INVOICE_DRAFT_CREATED_TITLE;
      case LOG.TYPE.CONTACT_CREATED:
        return CONTACT_CREATED_TITLE;
      default:
        return log.type;
    }
  };
  return (
    <LogTitleList>
      <i>
        <b>{getLogTitle()}</b>
      </i>
    </LogTitleList>
  );
};
