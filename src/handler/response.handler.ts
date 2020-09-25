export class ResponseHandler {
  static success(message: string, data: any): any {
    return {
      'success': true,
      'message': message,
      'data': data,
    };
  }

  static error(message: string): any {
    return {
      'success': false,
      'message': message,
      'data': null,
    };
  }
}
