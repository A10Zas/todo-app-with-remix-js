import { Button, Card, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';

type ModalBoxProps = {
	btnTitle: string;
	btnBgColor: string;
	customComp: React.ReactNode;
};

const ModalBox = ({ btnBgColor, btnTitle, customComp }: ModalBoxProps) => {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
			<Modal opened={opened} onClose={close} title="Add Todo" centered>
				<Card shadow="md" padding="xl">
					{customComp}
				</Card>
			</Modal>

			<Button onClick={open} bg={btnBgColor}>
				{btnTitle}
			</Button>
		</>
	);
};

export default ModalBox;
