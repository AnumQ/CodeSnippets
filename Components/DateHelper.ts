import React from "react";

export const getReadableDate = (date: Date) => {
  return date.toLocaleString("no-NO", {
    dateStyle: "full",
    timeStyle: "short",
  });
};
