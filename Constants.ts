export const APP_STATE = {
  LOADING: 0,
  LOGIN: 1,
  MAIN: 2,
};

export const COLLECTION = {
  CLIENTS: "clients",
  USERS: "users",
  BOOKINGS: "bookings",
  COMMENTS: "comments",
  LOGS: "logs",
  PROJECTS: "projects",
  PRODUCTS: "products",
};

export const FIREBASE_FUNCTIONS_API = process.env.REACT_APP_FUNCTIONS_URL;

export const DEBUG = process.env.REACT_APP_ENV === "development";

export const ExternalBookingSystem = {
  COMPANY: "Classified",
};
