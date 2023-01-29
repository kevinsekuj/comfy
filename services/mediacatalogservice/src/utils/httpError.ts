class HTTPError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

export default HTTPError;
