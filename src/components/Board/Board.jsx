import { useState } from 'react';

function Board(props) {
    const [title, setTitle] = useState(props.board.title);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleEditBoard = (event) => {
        event.preventDefault();
        const data = {
            title: title,
        };
        props.editBoard(props.board.id, data);
        document.getElementById("edit_board_" + props.board.id).close();
    };

    const handleAddStage = () => {
        const data = {
            title: 'New Stage',
            board: props.board.id
        }
        props.addStage(data);
    };
    const handleAddBoard = () => {
        const data = {
            title: 'New Board',
        }
        props.addBoard(data);
    };

    return (
        <>
            <dialog id={"edit_board_" + props.board.id} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("edit_board_" + props.board.id).close()}>✕</button>
                    </form>
                    <form className="flex gap-2 flex-col" onSubmit={handleEditBoard}>
                        <label className="input input-bordered flex items-center gap-2">
                            Title
                            <input type="text" className="grow" placeholder="My Project" value={title} onChange={handleTitleChange} />
                        </label>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </dialog>
            <div className="border rounded border-base-100 bg-base-300 shadow">
                <div className="bg-primary-content flex mx-4 border border-t-0 border-base-100 rounded">
                    <p className="text-primary grow px-2 font-bold">{props.board.title}</p>
                    <div className="dropdown dropdown-top dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-xs btn-outline btn-primary col-1 rounded-none border-y-0 border-e-0">⚙️</div>
                        <ul tabIndex={0} className="join join-vertical dropdown-content z-[1] menu p-0 shadow bg-primary-content border border-base-100 rounded w-52">
                            <li>
                                <button type="button" className="btn join-item btn-xs btn-outline btn-primary border-0 border-b-2 rounded-none" onClick={handleAddBoard}>➕ Add Board</button>
                            </li>
                            <li>
                                <button type="button" className="btn join-item btn-xs btn-outline btn-primary border-0 border-b-2 rounded-none" onClick={() => document.getElementById("edit_board_" + props.board.id).showModal()}>✏️ Edit</button>
                            </li>
                            <li>
                                <button type="button" className="btn join-item btn-xs btn-outline btn-primary border-0 border-b-2 rounded-none" onClick={handleAddStage}>➕ Add Stage</button>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 p-2">
                    {props.children}
                </div>
            </div>
        </>
    );
}

export default Board;
