import React, { useState } from "react";
import TaskForm from "./TaskForm";

const Board = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskCounter, setTaskCounter] = useState(1);
  const [editTask, setEditTask] = useState(null);

  const handleFormSubmit = (task) => {
    if (editTask) {
      const newTasks = [...tasks];
      const taskIndex = tasks.findIndex((t) => t.id === editTask.id);
      if (taskIndex !== -1) {
        newTasks[taskIndex] = task;
        setTasks(newTasks);
        setEditTask(null);
      }
    } else {
      const newTask = { ...task, id: taskCounter, taskCounter };
      setTasks([...tasks, newTask]);
      setTaskCounter(taskCounter + 1);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditTask(null);
  };

  const handleCreateTask = (task) => {
    setTasks([...tasks, task]);
    setShowModal(false);
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditTask(task);
      setShowModal(true);
    }
  };

  const moveTask = (taskId, status) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      const task = tasks[taskIndex];
      const newTasks = [...tasks];
      newTasks.splice(taskIndex, 1);
      task.status = status;
      setTasks([...newTasks, task]);
    }
  };

  console.log(tasks, "TASK");

  return (
    <div className="board-container">
      <div className="board">
        <button className="btn-create-task" onClick={handleShowModal}>
          Create issue
        </button>
        <div className="column-container">
          <div className="column">
            <h2>Todo</h2>
            {tasks
              .filter((task) => task.status === "Todo")
              .map((task) => (
                <div key={task.id} className="task">
                  Task: {task.taskCounter}
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <button
                    onClick={() => moveTask(task.id, "In Progress")}
                    className="btn-move"
                  >
                    Move to In Progress
                  </button>
                  <button onClick={() => handleEditTask(task.id)}>Edit</button>
                </div>
              ))}
          </div>
        </div>
        <div className="column-container">
          <div className="column">
            <h2>In Progress</h2>
            {tasks
              .filter((task) => task.status === "In Progress")
              .map((task) => (
                <div key={task.id} className="task">
                  Task: {task.taskCounter}
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <button
                    onClick={() => moveTask(task.id, "Done")}
                    className="btn-move"
                  >
                    Move to Done
                  </button>
                  <button onClick={() => handleEditTask(task.id)}>Edit</button>
                </div>
              ))}
          </div>
        </div>
        <div className="column-container">
          <div className="column">
            <h2>Done</h2>
            {tasks
              .filter((task) => task.status === "Done")
              .map((task) => (
                <div key={task.id} className="task">
                  Task: {task.taskCounter}
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
              ))}
          </div>
        </div>
        {showModal && (
          <TaskForm
            handleCloseModal={handleCloseModal}
            handleCreateTask={handleCreateTask}
            onSubmit={handleFormSubmit}
            taskCounter={taskCounter}
          />
        )}
      </div>
    </div>
  );
};

export default Board;
