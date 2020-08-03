export class ResponseHandler {
  static success(message: string, data: any): any {
    return {
      'message': message,
      'data': data,
    };
  }

  static error(message: string) {
    return {
      'message': message,
      'data': null,
    };
  }
}
