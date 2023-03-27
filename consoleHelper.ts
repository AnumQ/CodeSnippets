const DEBUG = process.env.REACT_APP_ENV === "production" ? false : true;

if (!DEBUG) {
  console.log = function () {
    // Do not log anything
  };
}

export const log = (data: any) => {
  if (DEBUG) console.log(data);
};
