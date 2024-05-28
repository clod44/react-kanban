import { useState } from 'react'

function Stage(props) {
    const [title, setTitle] = useState(props.stage.title);
    const [color, setColor] = useState(props.stage.color);
    const [taskTitle, setTaskTitle] = useState("My Task");
    const [taskDescription, setTaskDescription] = useState("Do something");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    const handleColorChange = (event) => {
        setColor(event.target.value);
    }

    const handleTaskTitleChange = (event) => {
        setTaskTitle(event.target.value);
    }
    const handleTaskDescriptionChange = (event) => {
        setTaskDescription(event.target.value);
    }

    const handleDeleteStage = (event) => {
        event.preventDefault();
        document.getElementById("edit_stage_" + props.stage.id).close();
        props.deleteStage(props.stage.id);
    }

    const handleEditStage = (event) => {
        event.preventDefault();
        const data = {
            title: title,
            color: color
        };
        props.editStage(props.stage.id, data);
        document.getElementById("edit_stage_" + props.stage.id).close();
    };

    const handleAddTask = (event) => {
        event.preventDefault();
        const data = {
            title: taskTitle,
            description: taskDescription,
            stage: props.stage.id
        }
        props.addTask(data);
        document.getElementById("add_task_" + props.stage.id).close();
    }
    const handleMoveStage = (dir) => {
        props.moveStage(props.stage.id, dir);
    }
    return (
        <>
            <dialog id={"edit_stage_" + props.stage.id} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("edit_stage_" + props.stage.id).close()}>✕</button>
                    </form>
                    <form className="flex gap-2 flex-col mb-2" onSubmit={handleEditStage}>
                        <label className="input input-bordered flex items-center gap-2">
                            Title
                            <input type="text" className="grow" placeholder="My Stage" value={title} onChange={handleTitleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Color
                            <input type="color" className="grow" value={color} onChange={handleColorChange} />
                        </label>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                    <form className='flex gap-2 flex-col' onSubmit={handleDeleteStage}>
                        <button type="submit" className="btn btn-xs btn-outline btn-error">Delete ({props.stage.title})</button>
                    </form>
                </div>
            </dialog>
            <dialog id={"add_task_" + props.stage.id} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("add_task_" + props.stage.id).close()}>✕</button>
                    </form>
                    <form className="flex gap-2 flex-col mb-2" onSubmit={handleAddTask}>
                        <label className="input input-bordered flex items-center gap-2">
                            Title
                            <input type="text" className="grow" placeholder="Task 1" value={taskTitle} onChange={handleTaskTitleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Description
                            <input type="text" className="grow" placeholder="this is my task" value={taskDescription} onChange={handleTaskDescriptionChange} />
                        </label>
                        <button type="submit" className="btn btn-primary">Add Task</button>
                    </form>
                </div>
            </dialog>

            <div className="border rounded border-base-100 bg-base-200 shadow">
                <div className="rounded flex mx-2 border border-base-100 border-t-0" style={{ backgroundColor: props.stage.color }}>
                    <p className="text-primary grow px-2 font-bold">{props.stage.title}</p>
                    <div className="dropdown dropdown-top dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-xs btn-outline btn-primary col-1 rounded-none border-y-0 border-e-0">⚙️</div>
                        <ul tabIndex={0} className="join join-vertical dropdown-content z-[1] menu p-0 shadow bg-primary-content border border-base-100 rounded w-52">
                            <li>
                                <button className="btn join-item btn-xs btn-outline btn-primary border-0 border-b-2 rounded-none" onClick={() => document.getElementById("add_task_" + props.stage.id).showModal()}>➕ Add Task</button>
                            </li>
                            <li>
                                <button className="btn join-item btn-xs btn-outline btn-primary border-0 border-b-2 rounded-none" onClick={() => document.getElementById("edit_stage_" + props.stage.id).showModal()}>✏️ Edit</button>
                            </li>
                            <li>
                                <div className="grid grid-cols-2 p-0">
                                    <button className="btn join-item btn-xs btn-outline btn-primary border-0  border-b-2 rounded-none" onClick={() => handleMoveStage("left")}>👈</button>
                                    <button className="btn join-item btn-xs btn-outline btn-primary border-0  border-b-2 rounded-none" onClick={() => handleMoveStage("right")}>👉</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2 p-2">
                    {props.children}
                </div>
            </div>
        </>
    );
}
export default Stage;