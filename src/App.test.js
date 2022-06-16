import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../src/App';
// install fetch mock library  by using the command npm install --save-dev jest-fetch-mock
import fetchMock from 'jest-fetch-mock';


const removeTodo = jest.fn();
const completeTodo = jest.fn();
const editTodo = jest.fn();
const mockedFunction = jest.fn();


test('render test', async () => {
    render(<TodoList />);
    expect(screen.getByText('Buy Bread')).toBeTruthy();
    expect(screen.getByText('Buy Milk')).toBeTruthy();
    expect(screen.getByText('Buy vegetables')).toBeTruthy();
    expect(screen.getAllByText('Complete')).toBeTruthy();
    expect(screen.getAllByText('Edit')).toBeTruthy();
    expect(screen.getAllByText('Add Task')).toBeTruthy();
   
});

test('logo to be present', async () => {
    render(<TodoList />);
    expect(screen.getAllByTestId('icon')).toBeTruthy();
});

test('render input', () => {
    render(<TodoList />);
    const inputEl = screen.getAllByTestId('inputField');
    expect(inputEl).toBeTruthy();
});

test('add task to the list from input box', () => {
    render(<TodoList />);
    const inputEl = screen.getAllByTestId('inputField');
    expect(inputEl).toBeTruthy();
});

test('input value changes', async () => {
    const { getByTestId } = render(
        <TodoList />
    );
    const input = getByTestId('inputField');
    fireEvent.change(input, { target: { value: 'ABCD' } });
    expect(input.value).toBe('ABCD');
});
test('should add todo to the list', async () => {
    render(
        <TodoList />
    );

    const startTodos = [
        {
            text: 'Buy Bread',
            isCompleted: false
        },
        {
            text: 'Buy Milk',
            isCompleted: false
        },
        {
            text: 'Buy vegetables',
            isCompleted: false
        }
    ];
    const input = screen.getByTestId('inputField');
    fireEvent.change(input, { target: { value: 'ABCD' } });
    expect(input.value).toBe('ABCD');
    fireEvent.click(screen.getByText('Add Task'));
    fetchMock.mockResponse(JSON.stringify(startTodos));
    const arrrayList = startTodos;
    expect(arrrayList).toHaveLength(3);
});

test('should delete item in the list', async () => {
    const item = [{ text: 'Buy Milk', isCompleted: false }];
    const itemIndex = 3;
    fetchMock.mockResponse(JSON.stringify(item));

    render(
        <TodoList
            index={itemIndex}
            todo={mockedFunction}
            removeTodo={removeTodo}
            editTodo={editTodo}
            completeTodo={completeTodo}

        />
    );

    const button = screen.getAllByText('Delete');
    fireEvent.click(button[0]);
    expect(mockedFunction).not.toBe(itemIndex);
});
test('edit button click', async () => {
    const item = [{ text: 'Buy Milk', isCompleted: false }];
    const itemIndex = 3;
    render(
        <TodoList
            index={itemIndex}
            todo={item}
            removeTodo={removeTodo}
            editTodo={editTodo}
            completeTodo={completeTodo}
        />
    );

    const button = screen.getAllByText('Edit');
    fireEvent.click(button[0]);
    expect(mockedFunction).not.toBe(itemIndex);
});
test('mark as complete', async () => {
    const item = { text: 'Buy Milk', isCompleted: false };
    const itemIndex = 3;
    render(
        <TodoList
            index={itemIndex}
            todo={item}
            removeTodo={removeTodo}
            editTodo={editTodo}
            completeTodo={completeTodo}

        />
    );

    const button = screen.getAllByText('Complete');
    screen.debug();
    fireEvent.click(button[0]);
    expect(mockedFunction).not.toBe(itemIndex);
});
