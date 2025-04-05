export class Response {
  status: number = 0;
  message: string = '';
  data: string[] | any | null = null;
  error?: string | null = null;

  constructor(
    status: number,
    message: string,
    data?: string[] | any | null,
    error?: string,
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
