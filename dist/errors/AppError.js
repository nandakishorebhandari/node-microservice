"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @author Ns1ghter
 * 
 */
class AppError extends Error {
  constructor(params) {
    super();
    const {
      field
    } = params || {};
    this._field = field;
  }

  toJSON() {
    return {
      error: this.errorCode(),
      message: this.errorMessage(),
      field: this._field,
      __httpCode: this.httpCode(),
      __appError: true
    };
  }

  errorCode() {
    /* istanbul ignore next */
    throw new Error('errorCode() must be overridden by subclasses');
  }

  httpCode() {
    /* istanbul ignore next */
    return 500;
  }

  errorMessage() {
    /* istanbul ignore next */
    return 'An error occurred';
  }

}

exports.default = AppError;