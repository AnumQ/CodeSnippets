import React from "react";
import { Formik, Field, Form } from "formik";

export const SearchForm = ({
  onSearchSubmit,
}: {
  onSearchSubmit: (bookingCode: string) => void;
}) => {
  return (
    <>
      <label>Enter booking code</label>
      <Formik
        initialValues={{ bookingCode: "" }}
        onSubmit={async (values: { bookingCode: string }) => {
          const bookingCode = values.bookingCode;
          onSearchSubmit(bookingCode);
        }}
      >
        {({ errors, touched }) => (
          <Form style={formStyle}>
            <div style={{ display: "flex" }}>
              <Field
                className="mr-2"
                name="bookingCode"
                type="text"
                validate={validateBookingCode}
                style={{ height: "2.4rem" }}
              />
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
            <div style={errorStyle}>
              {errors.bookingCode && touched.bookingCode && (
                <div className="mt-2 alert-danger">{errors.bookingCode}</div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

function validateBookingCode(bookingCode: string) {
  let error = "";

  if (!bookingCode || bookingCode === "") {
    error = "Invalid booking number";
  }
  return error;
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const errorStyle = { display: "flex" };
