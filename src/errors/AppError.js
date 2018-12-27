/**
 * @author Ns1ghter
 * @flow
 */

export default class AppError extends Error {
	_field: ?string;

	constructor(params: ?Object) {
		super();

		const { field } = params || {};
		this._field = field;
	}

	toJSON() {
		return {
			error: this.errorCode(),
			message: this.errorMessage(),
			field: this._field,
			__httpCode: this.httpCode(),
			__appError: true,
		};
	}

	errorCode(): number {
		/* istanbul ignore next */
		throw new Error('errorCode() must be overridden by subclasses');
	}

	httpCode(): number {
		/* istanbul ignore next */
		return 500;
	}

	errorMessage(): string {
		/* istanbul ignore next */
		return 'An error occurred';
	}
}
