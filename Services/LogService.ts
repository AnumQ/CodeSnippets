import React from "react";
import { log } from "../consoleHelper";
import { COLLECTION, LOG } from "../Constants";
import { db } from "../iSnittFirebase";
import { Booking } from "../Models/Booking";
import firebase from "firebase/app";
import { LoggerRepo } from "../Repositories/LoggerRepo";
import { Log } from "../Models/Log";
import { Seller } from "../Models/Seller";

export class LogService {
  static getAllLogs = async () => {
    try {
      const docSnapshots = await db
        .collection(COLLECTION.LOGS)
        .orderBy("created", "desc")
        .get();

      const logs: Log[] = [];
      docSnapshots.forEach((doc: firebase.firestore.FirestoreDocument) => {
        logs.push(doc.data() as Log);
      });
      return logs;
    } catch (error) {
      log(error);
      LoggerRepo.error(error);
    }
  };

  static getLogsBasedOnBookingCode = async (bookingCode: string) => {
    try {
      const docs = await db
        .collection(COLLECTION.LOGS)
        .where("bookingCode", "==", bookingCode)
        .get();

      const logs: Log[] = [];
      docs.forEach((doc) => {
        logs.push(doc.data() as Log);
      });
      return logs;
    } catch (error) {
      log(error);
      LoggerRepo.error(error);
    }
  };

  static createContactLog = (
    seller: Seller,
    bookingCode: string,
    name: string
  ) => {
    db.collection(COLLECTION.LOGS)
      .doc()
      .set(
        {
          type: LOG.TYPE.CONTACT_CREATED,
          bookingCode: bookingCode,
          contactName: seller.name,
          contactEmail: seller.email,
          address: seller.address.streetAddress,
          postCode: seller.address.postCode,
          author: name,
          created: firebase.firestore.Timestamp.now(),
        },
        { merge: true }
      )
      .catch((error) => {
        LoggerRepo.error(error);
      });
  };

  static createInvoiceLog = (booking: Booking, name: string) => {
    db.collection(COLLECTION.LOGS)
      .doc()
      .set(
        {
          type: LOG.TYPE.INVOICE_DRAFT_CREATED,
          bookingCode: booking.code,
          address: booking.seller.address.streetAddress,
          postCode: booking.seller.address.postCode,
          author: name,
          created: firebase.firestore.Timestamp.now(),
        },
        { merge: true }
      )
      .catch((error) => {
        LoggerRepo.error(error);
      });
  };
}
