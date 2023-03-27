import React from "react";

export const LogAuthorView = ({ author }: { author: string }) => {
  return (
    <div>
      <a style={authorStyle}>{author}</a>
    </div>
  );
};

const authorStyle = { fontSize: "14px", fontWeight: "bold" };
