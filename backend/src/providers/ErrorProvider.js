import { errors } from "./DataProvider.js";

class ErrorProvider {
  constructor() {}

  getError(status) {
    console.log(this.classifyError(status))
    return this.classifyError(status);
  }

  classifyError(status) {
    const index = errors.findIndex((prev) => prev.status === status);
    const message = errors[index]?.message
    return message ? message : "Unknown error occured";
  }
}

const Error = new ErrorProvider();

export default Error;
