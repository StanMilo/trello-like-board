const TaskCard = ({ id, title, status, assignedUser, onClick }) => {
  return (
    <div className="task-card" onClick={() => onClick(id)}>
      <h3>{title}</h3>
      <p>Status: {status}</p>
      <p>Assigned User: {assignedUser}</p>
    </div>
  );
};

export default TaskCard;