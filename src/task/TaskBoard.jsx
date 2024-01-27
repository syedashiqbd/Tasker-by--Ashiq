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
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);

  const [showTaskModal, setShowTaskModal] = useState(false);

  const handleAddTask = (e, newTask) => {
    e.preventDefault();
    console.log('Adding a Task', newTask);
    setTasks([...tasks, newTask]);
    setShowTaskModal(false);
  };

  return (
    <section className="mb-20" id="tasks">
      {showTaskModal && <AddTaskModal onSave={handleAddTask} />}
      <div className="container">
        <div className="py-2 flex justify-end">
          <SearchTask />
        </div>

        <div className="rounded-lg border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions onAddClick={() => setShowTaskModal(true)} />
          <TaskList tasks={tasks} />
        </div>
      </div>
    </section>
  );
};
export default TaskBoard;
