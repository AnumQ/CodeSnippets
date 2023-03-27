import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export const SendInvoiceButton = ({
  isDisabled,
  onClick,
}: {
  isDisabled: boolean;
  onClick: () => void;
}) => {
  return (
    <Button variant="primary" disabled={isDisabled} onClick={onClick}>
      Send faktura
    </Button>
  );
};
