import React, { useEffect, useState } from 'react';
import List from './components/List';
import axios from 'axios';
import { baseURl } from './utils/constant';

const App = () => {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(true);
  const [updateID, setUpdateID] = useState(null);

  useEffect(() => {
    axios.get(`${baseURl}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURl}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput('');
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateMode = (id, task) => {
    console.log(task);
    setInput(task);
    setUpdateID(id);
  };

  const updateTask = () => {
    axios.put(`${baseURl}/update/${updateID}`, { task: input }).then((res) => {
      console.log(res);
      setUpdateUI((prevState) => !prevState);
      setUpdateID(null);
      setInput('');
    });
  };

  return (
    <main>
      <h1 className='title'>CRUD OPERATIONS</h1>
      <div className='input_holder'>
        <input
          type='text'
          placeholder='Enter your task'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit' onClick={updateID ? updateTask : addTask}>
          {updateID ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      {tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <List
              key={task._id}
              id={task._id}
              task={task.task}
              setUpdateUI={setUpdateUI}
              updateMode={updateMode}
            />
          ))}
        </ul>
      )}
    </main>
  );
};

export default App;
