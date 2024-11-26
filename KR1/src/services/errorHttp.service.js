class ErrorHttp extends Error {
    constructor(status = 500, message) {
      super(message);
      this.status = status;
    }
  }
  
  export default ErrorHttp;