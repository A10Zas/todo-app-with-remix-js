import { TodosApi } from '~/utils/api';

export async function getAllTodo() {
	try {
		const todos = await TodosApi.fetchTodos();
		return todos;
	} catch (error) {
		throw new Error(`${error?.message}`);
	}
}

export async function createTodo(data: any) {
	try {
		const res = await TodosApi.addTodo(data);
		console.log('res.data', res.data);
		return res.data;
	} catch (error) {
		// console.log('error in Api Service', error);
		return {
			error: 'An unexpected error occurred. Please try again later.',
			errorName: 'addTodo',
		};
	}
}

export async function deleteTodo(id: string) {
	try {
		const res = await TodosApi.deleteTodo(id);
		console.log('res.data', res.data);
		return res.data;
	} catch (error) {
		// console.log('error in Api Service', error);
		return {
			error: 'An unexpected error occurred. Please try again later.',
			errorName: 'deleteTodo',
		};
	}
}
