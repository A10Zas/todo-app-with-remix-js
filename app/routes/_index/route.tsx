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
import { data } from '~/utils/constant';
import { addTodoAction } from './actions';
import { searchDataSorting } from '~/utils/sorting';
import { useEffect, useState } from 'react';
import AddTodoForm from '~/features/forms/AddTodoForm';
import { useActionData } from '@remix-run/react';
import { notifications } from '@mantine/notifications';
import { useDebouncedValue } from '@mantine/hooks';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Todo App' },
		{
			name: 'description',
			content: 'Testing with remix and nest js as backend',
		},
	];
};

export const action = addTodoAction;

type TodoDataType = {
	id: string;
	todo: string;
	status: string;
	dueDate: string;
};

type ActionDataType = {
	errors: { todo: string; dueDate: string };
	success: boolean;
};

export default function HomePage() {
	const icon = <BiSearch size={25} />;

	const [searchData, setSearchData] = useState<TodoDataType[]>(data);
	const [searchInput, setSearchInput] = useState('');

	const [debouncedSearchInput] = useDebouncedValue(searchInput, 300);

	const actionData = useActionData<ActionDataType>();

	useEffect(() => {
		const a = searchDataSorting(data, debouncedSearchInput);
		setSearchData(a);
	}, [debouncedSearchInput]);

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
	}, [actionData?.errors]);

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
						{searchData.map((d: TodoDataType) => (
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
									<Button bg={'red'}>Delete</Button>
								</Group>
							</Box>
						))}
					</ScrollArea>
				</Stack>
			</Box>
		</Container>
	);
}
