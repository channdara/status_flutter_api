export function resSuccess(message: string, data: any): any {
  return {
    'success': true,
    'message': message,
    'data': data,
  };
}

export function resError(message: string): any {
  return {
    'success': false,
    'message': message,
    'data': null,
  };
}