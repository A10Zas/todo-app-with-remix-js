import { Button, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Form, useActionData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { ActionDataType } from '~/routes/_index/route';

const AddTodoForm = () => {
	const [todo, setTodo] = useState('');
	const [dueDate, setDueDate] = useState('');
	const actionData = useActionData<ActionDataType>();

	// Reset the form fields when there's an error
	useEffect(() => {
		if (actionData?.errorName === 'addTodo') {
			setTodo('');
			setDueDate('');
		}
	}, [actionData?.errorName]);

	return (
		<Form method="post" className="flex flex-col p-10">
			{/* Todo Field */}
			<TextInput
				variant="filled"
				label="Todo"
				placeholder="Write a todo"
				name="todo"
				value={todo}
				onChange={(event) => setTodo(event.currentTarget.value)}
			/>

			{/* Due Date Field */}
			<DateInput
				label="Due Date"
				variant="filled"
				placeholder="Pick a date"
				name="dueDate"
				value={dueDate}
				onChange={setDueDate}
			/>

			{/* Hidden Field for Action Type */}
			<input type="hidden" name="actionType" value="add" />

			{/* Submit Button */}
			<Button type="submit" mt={10}>
				Submit
			</Button>
		</Form>
	);
};

export default AddTodoForm;
