import { Button, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Form } from '@remix-run/react';

const AddTodoForm = () => {
	const form = useForm({
		initialValues: {
			todo: '',
			dueDate: '',
			actionType: 'add', // Include actionType for server-side logic
		},
		validate: {
			todo: (value) =>
				value.trim().length === 0 ? 'Todo cannot be empty' : null,
			dueDate: (value) =>
				!value ? 'Invalid Input. Please provide a valid date.' : null,
		},
	});

	return (
		<Form method="post" className="flex flex-col p-10">
			{/* Todo Field */}
			<TextInput
				variant="filled"
				label="Todo"
				placeholder="Write a todo"
				name="todo"
				{...form.getInputProps('todo')}
			/>

			{/* Due Date Field */}
			<DateInput
				label="Due Date"
				variant="filled"
				placeholder="Pick a date"
				name="dueDate"
				{...form.getInputProps('dueDate')}
			/>

			{/* Hidden Field for Action Type */}
			<input
				type="hidden"
				name="actionType"
				value={form.values.actionType}
				{...form.getInputProps('actionType')}
			/>

			{/* Submit Button */}
			<Button type="submit" mt={10}>
				Submit
			</Button>
		</Form>
	);
};

export default AddTodoForm;
