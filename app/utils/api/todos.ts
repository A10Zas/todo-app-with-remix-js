import ApiService from '~/services/ApiService';

const addTodo = async (data: any) => {
	const res = await ApiService.post('/todo/create', data);
	return res;
};
const fetchTodos = async () => {
	const todos = await ApiService.get('/todo/getAll');

	return todos.data;
};
const deleteTodo = async (id: string) => {
	const res = await ApiService.delete(`/todo/delete/${id}`);
	return res;
};

export default { addTodo, fetchTodos, deleteTodo };
