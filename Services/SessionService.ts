import { AUTH } from "../Constants"; // AUTH does not exist in constants due to NDA.
import { BookingSystem } from "../Models/BookingSytemAuth";
import { LoggerRepo } from "../Repositories/LoggerRepo";

export class SessionService {
  static updateSessionTokens = (tokenEntity: BookingSystem) => {
    sessionStorage.setItem(AUTH.BookingSytem.TOKEN, tokenEntity?.token ?? "");
    sessionStorage.setItem(
      AUTH.BookingSytem.REFRESH_TOKEN,
      tokenEntity?.refresh_token ?? ""
    );
  };

  static setAuthIdToken = (token: string) => {
    sessionStorage.setItem(AUTH.FIREBASE_TOKEN_ID, token);
  };

  static getBookingSytemToken = () => {
    return sessionStorage.getItem(AUTH.BookingSytem.TOKEN);
  };

  static getBookingSytemRefreshToken = () => {
    return sessionStorage.getItem(AUTH.BookingSytem.REFRESH_TOKEN);
  };

  static getFirebaseTokenId = () => {
    return sessionStorage.getItem(AUTH.FIREBASE_TOKEN_ID);
  };
}
