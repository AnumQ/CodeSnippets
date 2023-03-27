import React from "react";

export const Spinner = ({
  title,
  fullHeight = true,
}: {
  title?: string;
  fullHeight?: boolean;
}) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: fullHeight ? "100vh" : "",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="mt-2">
          <i>{title}</i>
        </div>
      </div>
    </div>
  );
};
