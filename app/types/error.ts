// types/errors.ts

export type ApiError = {
	status: number;
	message: string;
};

export class TodoApiError extends Error {
	public status: number;

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
		this.name = 'TodoApiError';
	}
}
