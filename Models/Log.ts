import React from "react";
import firebase from "firebase/app";

export type Log = {
  type: string;
  bookingCode: string;
  address: string;
  contactName: string;
  contactEmail: string;
  postCode: string;
  author: string;
  created: firebase.firestore.Timestamp;
};
