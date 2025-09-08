export class ResponseDto<T> {
  readonly body: T;

  statusCode!: number;

  constructor(statusCode: number, body: T) {
    this.statusCode = statusCode;
    this.body = body;
  }
}
