import {
	Box,
	Button,
	Container,
	Flex,
	Group,
	ScrollArea,
	Stack,
	Text,
	TextInput,
} from '@mantine/core';
import type { MetaFunction } from '@remix-run/node';
import { BiSearch } from 'react-icons/bi';
import ModalBox from '~/components/ModalBox';
// import { data } from '~/utils/constant';
import { TodoAction } from './actions';
import { searchDataSorting } from '~/utils/sorting';
import { useEffect, useState } from 'react';
import AddTodoForm from '~/features/forms/AddTodoForm';
import { Form, json, useActionData, useLoaderData } from '@remix-run/react';
import { notifications } from '@mantine/notifications';
import { useDebouncedValue } from '@mantine/hooks';
import { deleteTodo, getAllTodo } from '~/services/TodoServices';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Todo App' },
		{
			name: 'description',
			content: 'Testing with remix and nest js as backend',
		},
	];
};

export const action = TodoAction;

type TodoDataType = {
	id: string;
	todo: string;
	status: string;
	dueDate: string;
};

export const loader = async () => {
	try {
		const todos = await getAllTodo();
		return json({ todos });
	} catch (error) {
		console.log('error in loader', error);

		return json({ error: `Fetch all Todo Error :${error}` });
	}
};

export type ActionDataType = {
	errors: { todo: string; dueDate: string };
	success: boolean;
	error: string;
	errorName: string;
};

type LoaderData = {
	todos: Array<TodoDataType>;
	error?: string;
};

export default function HomePage() {
	const { todos, error }: LoaderData = useLoaderData();

	const icon = <BiSearch size={25} />;

	const [searchData, setSearchData] = useState<TodoDataType[]>(todos || []);
	const [searchInput, setSearchInput] = useState('');

	const [debouncedSearchInput] = useDebouncedValue(searchInput, 300);

	const actionData = useActionData<ActionDataType>();

	useEffect(() => {
		if (todos) {
			const a = searchDataSorting(todos, debouncedSearchInput);
			setSearchData(a);
		}
	}, [debouncedSearchInput, todos]);

	useEffect(() => {
		if (actionData?.errors) {
			notifications.show({
				title: 'Error',
				message: `Todo: ${actionData.errors.todo || ''} \n DueDate: ${
					actionData.errors.dueDate || ''
				}`,
				color: 'red',
			});
		}

		if (error) {
			notifications.show({
				title: 'Error',
				message: `${error}`,
				color: 'red',
			});
		}
		if (actionData?.error) {
			notifications.show({
				title: 'Error',
				message: `${actionData?.error}`,
				color: 'red',
			});
		}
	}, [actionData?.error, actionData?.errors, error]);

	return (
		<Container
			fluid
			className="min-h-screen flex flex-col justify-start"
			p={25}
		>
			<Text fw={500} ta="center" td="underline" className="text-4xl">
				Todo App
			</Text>
			<Box
				size="xl"
				className="flex-1 flex flex-col rounded-xl items-center"
				p={20}
				m={15}
			>
				<Flex
					direction={{ base: 'column', sm: 'row' }}
					gap={{ base: 'sm', sm: 'lg' }}
					justify={{ sm: 'center' }}
				>
					<TextInput
						value={searchInput}
						onChange={(e) => setSearchInput(e.currentTarget.value)}
						placeholder="Search...."
						rightSection={icon}
						disabled={searchData.length <= 1}
					/>
					<ModalBox btnBgColor="" btnTitle="Add" customComp={<AddTodoForm />} />
				</Flex>
				<Stack
					className="border flex-1 rounded-xl"
					m={20}
					w={{
						base: '100%', // Full width for small devices
						md: '800', // 600px width for screens >= 768px
					}}
					// w={{ xs: '500', sm: '100' }}
				>
					<ScrollArea h={500}>
						{searchData.length > 0 ? (
							searchData.map((d: TodoDataType) => (
								<Box
									key={d.id}
									m={20}
									p={15}
									className="border rounded-lg flex gap-4 justify-between"
								>
									<Stack gap="xs">
										<Text fw={500} ta="center" className="">
											{d.todo}
										</Text>
										<Text fw={500}>DueDate : {d.dueDate}</Text>
										<Text fw={500}>Status : {d.status}</Text>
									</Stack>
									<Group>
										<Button bg={'green'}>Complete</Button>
										<Button>Edit</Button>
										<Form method="post">
											{/* Hidden fields to pass the id and actionType */}
											<input type="hidden" name="id" value={d.id} />
											<input type="hidden" name="actionType" value="delete" />
											<Button
												bg={'red'}
												type="submit"
												onClick={() => {
													console.log(`Deleting todo with ID: ${d.id}`);
												}}
											>
												Delete
											</Button>
										</Form>
									</Group>
								</Box>
							))
						) : (
							<Text ta="center" className="text-2xl font-bold underline">
								No Todo Present
							</Text>
						)}
					</ScrollArea>
				</Stack>
			</Box>
		</Container>
	);
}
