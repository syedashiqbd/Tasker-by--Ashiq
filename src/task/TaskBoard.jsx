import { useState } from 'react';
import SearchTask from './SearchTask';
import TaskActions from './TaskActions';
import TaskList from './TaskList';
import AddTaskModal from './AddTaskModal';

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: 'Learn React Fast',
    description:
      'I want to learn React such than I can treat it like my slave and make it do whatever I want to do',
    tags: ['Web', 'React', 'Js'],
    priority: 'High',
    isFavorite: false,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskToUpdate, SetTaskToUpdate] = useState(null);

  const handleAddEditTask = (e, newTask, isAdd) => {
    e.preventDefault();
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowTaskModal(false);
    SetTaskToUpdate(null);
  };

  const handleEditTask = (task) => {
    SetTaskToUpdate(task);
    setShowTaskModal(true);
  };

  const handleCloseModal = () => {
    setShowTaskModal(false);
    SetTaskToUpdate(null);
  };

  const handleDeleteTask = (taskId) => {
    const taskAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskAfterDelete);
  };

  const handleDeleteAllTask = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  const handleIsFavorite = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const newTasks = [...tasks];

    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;

    setTasks(newTasks);
  };

  const handleSearchTerm = (searchTerm) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...filtered]);
  };

  return (
    <section className="mb-20" id="tasks">
      {showTaskModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          handleCloseModal={handleCloseModal}
        />
      )}
      <div className="container">
        <div className="py-2 flex justify-end">
          <SearchTask onSearch={handleSearchTerm} />
        </div>

        <div className="rounded-lg border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowTaskModal(true)}
            onDeleteClick={handleDeleteAllTask}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleIsFavorite}
            />
          ) : (
            <p className="text-center text-3xl">
              No Task Found. Please Add One
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
export default TaskBoard;
