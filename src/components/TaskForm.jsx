import React, { useState, useEffect } from "react";

const TaskForm = ({ task, onSubmit, handleCloseModal, showModal, taskCounter }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [assignedUser, setAssignedUser] = useState("");
  

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setAssignedUser(task.assignedUser);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      status,
      assignedUser,
    };
    onSubmit(newTask);
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  return (
    <div className="task-modal">
      <div className={showModal ? "modal display-block" : "modal display-none"}>
        <section className="modal-main">
          <div className="task-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                Task: {taskCounter}
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="assignedUser">User:</label>
                <select
                  id="assignedUser"
                  value={assignedUser}
                  onChange={(e) => setAssignedUser(e.target.value)}
                >
                  <option value="">-- Select User --</option>
                  <option value="User 1">User 1</option>
                  <option value="User 2">User 2</option>
                  <option value="User 3">User 3</option>
                </select>
              </div>
              <div className="form-buttons">
                <button type="submit" className="btn-submit">
                  Save
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TaskForm;
