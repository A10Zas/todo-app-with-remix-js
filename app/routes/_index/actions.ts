import {
	json,
	redirect,
	type ActionFunction,
	type ActionFunctionArgs,
} from '@remix-run/node';
import { createTodo, deleteTodo } from '~/services/TodoServices';
export const TodoAction: ActionFunction = async ({
	request,
}: ActionFunctionArgs) => {
	const formData = await request.formData();
	const actionType = formData.get('actionType');

	try {
		if (actionType === 'add') {
			const todo = formData.get('todo');
			const dueDate = formData.get('dueDate');

			if (!todo || !dueDate) {
				return json({
					errors: {
						todo: !todo ? 'Todo is required' : null,
						dueDate: !dueDate ? 'Due Date is required' : null,
					},
				});
			}
			const data = { todo, dueDate };
			const response = await createTodo(data);
			console.log('response', response);

			return response;
		}
		if (actionType === 'delete') {
			const id = formData.get('id');
			try {
				// Call your delete service
				await deleteTodo(String(id)); // Assuming deleteTodo is already implemented

				return json({ success: true });
			} catch (error) {
				console.error('Error in delete action:', error);
				return json({
					success: false,
					error: `Failed to delete Todo: ${error}`,
				});
			}
		}
		return redirect('/');
	} catch (error) {
		console.log('error in action');

		return json({
			errors: { global: 'An unexpected error occurred. Please try again.' },
		});
	}
};

// export const loginAction = async ({ request }) => {
// 	console.log('request', request);

// 	const formData = new URLSearchParams(await request.text());

// 	console.log('formdata', formData);

// 	const identifier = formData.get('identifier');
// 	const password = formData.get('password');

// 	if (!identifier || !password) {
// 		return json({ error: 'Both fields are required.' }, { status: 400 });
// 	}

// 	const user = await loginUser(identifier, password);
// 	if (!user) {
// 		return json({ error: 'Invalid credentials.' }, { status: 401 });
// 	}

// 	return redirect('/dashboard');
// };
