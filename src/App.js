import React from 'react';
import './App.css';


// component to complete , edit, delete list item in list,
//  which is being passed to main component 

const Todo = ({
  todo, index, completeTodo, removeTodo, editTodo
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <div
      className="todo"
          >

      {!isEditing ?
      <div style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }} > {todo.text}</div>
       : (
        <InputForm
          editTodo={editTodo}
          defaultValue={todo.text}
          index={index}
          setIsEditing={setIsEditing}
          isEditing={isEditing} 
          style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
        />
      )}

      <div className="buttonContainer">
        <button
          className="completeBtn"
          onClick={() => completeTodo(index)}
        >
          Complete
        </button>
        <button
          data-testid=" close"
          className="crossBtn"
          onClick={() => removeTodo(index)}
        >
          Delete
        </button>
        <button
          className="editBtn"
          onClick={() => setIsEditing(!isEditing)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

//input field to edit the item in list//

const InputForm = ({
  defaultValue, editTodo, index, setIsEditing, isEditing
}) => {
  const [value, setValue] = React.useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    editTodo(index, value);
    setIsEditing(!isEditing);
  };
  return (
    <>
      <input
        data-testid="inputField"
        type="text"
        className="inputForm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="saveButton" onClick={(e) => handleSubmit(e)}> Save</button>

    </>
  );
};
//add new todo to list//
const TodoForm = ({ addTodo }) => {
  const [value, setValue] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <>
      <input
        data-testid="inputField"
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="addTask"onClick={(e) => handleSubmit(e)}> Add Task</button>

    </>
  );
};

const App = () => {
  const [todos, setTodos] = React.useState([
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
  ]);

  const addTodo = (text) => {
    const newTodos = [{ text }, ...todos];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (indexv, updtedTask) => {
    const updatedTodos = todos.map((todo, index) => {
      if (index === indexv) {
        return { ...todo, text: updtedTask };
      }
      return todo;
    });
    console.log(updatedTodos);
    setTodos(updatedTodos);
  };

  return (
    <div className="app">
      <div className="logo"data-testid="icon" />
      <div className="todoList">

        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            editTodo={editTodo}

          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
};

export default App;
