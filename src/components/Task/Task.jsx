import { useState } from "react";

function Task(props) {
    const [title, setTitle] = useState(props.task.title);
    const [description, setDescription] = useState(props.task.description);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleEditTask = (event) => {
        event.preventDefault();
        const data = {
            title: title,
            description: description
        };
        props.editTask(props.task.id, data);
        document.getElementById("edit_task_" + props.task.id).close();
    };

    const handleDeleteTask = (event) => {
        event.preventDefault();
        document.getElementById("edit_task_" + props.task.id).close();
        props.deleteTask(props.task.id);
    };

    const handleMoveTask = (dir) => {
        props.moveTask(props.task.id, dir);
    }

    return (
        <>
            <dialog id={"edit_task_" + props.task.id} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("edit_task_" + props.task.id).close()}>✕</button>
                    </form>
                    <form className="flex gap-2 flex-col mb-2" onSubmit={handleEditTask}>
                        <label className="input input-bordered flex items-center gap-2">
                            Title
                            <input type="text" className="grow" placeholder="Task 1" value={title} onChange={handleTitleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Description
                            <input type="text" className="grow" placeholder="this is my task" value={description} onChange={handleDescriptionChange} />
                        </label>
                        <button type="submit" className="btn btn-primary">Edit Task</button>
                    </form>
                    <form className='flex gap-2 flex-col' onSubmit={handleDeleteTask}>
                        <button type="submit" className="btn btn-xs btn-outline btn-error">Delete ({props.task.title})</button>
                    </form>
                </div>
            </dialog>

            <div className="border rounded border-base-100 bg-base-300 shadow">
                <div className="bg-primary-content text-start flex rounded">
                    <p className="text-primary grow px-2">{props.task.title}</p>
                    <div>
                        <div className="dropdown dropdown-top dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-xs btn-outline btn-primary col-1 rounded-none border-y-0 border-e-0">⚙️</div>
                            <ul tabIndex={0} className="join join-vertical dropdown-content z-[1] menu p-0 shadow bg-primary-content border border-base-100 rounded w-52">
                                <li>
                                    <button className="btn join-item btn-xs btn-outline btn-primary border-0 border-b-2 rounded-none" onClick={() => document.getElementById("edit_task_" + props.task.id).showModal()}>✏️ Edit</button>
                                </li>
                                <div className="grid grid-cols-4 p-0">
                                    <button className="btn join-item btn-xs btn-outline btn-primary border-0  border-b-2 rounded-none" onClick={() => handleMoveTask("left")}>👈</button>
                                    <button className="btn join-item btn-xs btn-outline btn-primary border-0 border-b-2 rounded-none" onClick={() => handleMoveTask("right")}>👉</button>
                                    <button className="btn join-item btn-xs btn-outline btn-primary border-0 border-b-2 rounded-none" onClick={() => handleMoveTask("up")}>👆</button>
                                    <button className="btn join-item btn-xs btn-outline btn-primary border-0  border-b-2 rounded-none" onClick={() => handleMoveTask("down")}>👇</button>
                                </div>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-start px-2 text-xs">
                    <p>{props.task.description}</p>
                </div>
            </div>
        </>
    );
}
export default Task;