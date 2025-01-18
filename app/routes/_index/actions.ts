import {
	json,
	redirect,
	type ActionFunction,
	type ActionFunctionArgs,
} from '@remix-run/node';
export const addTodoAction: ActionFunction = async ({
	request,
	params,
}: ActionFunctionArgs) => {
	const formData = await request.formData();
	const todo = formData.get('todo');
	const dueDate = formData.get('dueDate');

	if (!todo || !dueDate) {
		return {
			errors: {
				todo: !todo ? 'Todo is required' : null,
				dueDate: !dueDate ? 'Due Date is required' : null,
			},
		};
	}

	// Add todo logic here...

	return redirect('/');
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
