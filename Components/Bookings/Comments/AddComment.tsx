import React from "react";
import { Button } from "react-bootstrap";

export const AddComment = ({
  saveComment: saveComments,
}: {
  saveComment: (comment: string) => void;
}) => {
  let comment = "";
  return (
    <form>
      <label>
        <b>Kommentar:</b>
      </label>
      <input
        className="ml-1 w-50"
        id="input-comment"
        onChange={(e) => {
          comment = e.target.value;
        }}
      ></input>
      <Button
        type="submit"
        variant="warning"
        className="ml-3"
        onClick={(e) => {
          e.preventDefault();
          if (comment === "") return;
          saveComments(comment);
          const inputField = document.getElementById(
            "input-comment"
          ) as HTMLInputElement;
          if (inputField !== null) {
            inputField.value = "";
          }
        }}
      >
        Lagre
      </Button>
    </form>
  );
};
