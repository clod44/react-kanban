import { useEffect, useState } from 'react'
import './App.css'
import Nav from './components/Nav/Nav.jsx'

import Board from './components/Board/Board.jsx'
import BoardClass from './components/Board/BoardClass.js'

import Stage from './components/Stage/Stage.jsx'
import StageClass from './components/Stage/StageClass.js'

import Task from './components/Task/Task.jsx'
import TaskClass from './components/Task/TaskClass.js'

function App() {
    const [boards, setBoards] = useState(
        [
            new BoardClass('Default Board'),
        ]
    )
    const [stages, setStages] = useState(
        [
            new StageClass('To Do', boards[0].id),
            new StageClass('In Progress', boards[0].id),
            new StageClass('Done', boards[0].id),
        ]
    );

    function lorem(len = 10) {
        const sample = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(' ');
        let result = "";
        while (result.length < len) {
            //pick a random elemt from sample array
            result += sample[Math.floor(Math.random() * sample.length)];
            result += " ";
        }
        return result.slice(0, len).trim();
    }
    function generateRandomTasks() {
        for (let i = 0; i < 10; i++) {
            const randomStage = Math.floor(Math.random() * 3);
            const stage = stages[randomStage];
            const data = {
                title: `Task ${lorem(5)} ${i + 1}`,
                description: `${lorem(Math.floor(Math.random() * 50 + 10))} ${i + 1}`,
                stage: stage.id
            }
            addTask(data);
        }
    }
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        generateRandomTasks();
    }, [])



    const addBoard = (data) => {
        const board = new BoardClass(data.title);
        setBoards(b => [...b, board]);
    }
    const editBoard = (id, data) => {
        //find the board
        const board = boards.find((board) => board.id === id);
        //update the board
        board.title = data.title;
        setBoards([...boards]);
    }
    const editStage = (id, data) => {
        //find the stage
        const stage = stages.find((stage) => stage.id === id);
        //update the stage
        stage.title = data.title;
        stage.color = data.color;
        setStages([...stages]);
    }
    const addStage = (data) => {
        const stage = new StageClass(data.title, data.board);
        setStages(s => [...s, stage]);
    }
    const deleteStage = (id) => {
        setStages(s => s.filter(stage => stage.id !== id));
    }
    const addTask = (data) => {
        const task = new TaskClass(data.title, data.description, data.stage);
        setTasks(t => [...t, task]);
    }
    const editTask = (id, data) => {
        //find the task
        const task = tasks.find((task) => task.id === id);
        //update the task
        task.title = data.title;
        task.description = data.description;
        setTasks([...tasks]);
    }
    const deleteTask = (id) => {
        setTasks(t => t.filter(task => task.id !== id));
    }

    const moveTask = (id, dir) => {
        const task = tasks.find((task) => task.id === id);
        const index = tasks.indexOf(task);
        if (dir === 'up' || dir === 'down') {
            const newIndex = index + (dir === 'up' ? -1 : 1);
            if (newIndex >= 0 && newIndex < tasks.length) {
                const newTask = tasks[newIndex];
                tasks[index] = newTask;
                tasks[newIndex] = task;
                setTasks(t => [...t]);
            }
        } else if (dir === 'left' || dir === 'right') {
            const currentStageIndex = stages.findIndex((stage) => stage.id === task.stage);
            const newStageIndex = currentStageIndex + (dir === 'left' ? -1 : 1);
            if (newStageIndex >= 0 && newStageIndex < stages.length) {
                const newStageId = stages[newStageIndex].id;
                task.stage = newStageId;
                setTasks(t => [...t]);
            }
        }
    }
    const moveStage = (id, dir) => {
        if (dir === 'left' || dir === 'right') {
            const currentStageIndex = stages.findIndex((stage) => stage.id === id);
            const newStageIndex = currentStageIndex + (dir === 'left' ? -1 : 1);
            if (newStageIndex >= 0 && newStageIndex < stages.length) {
                //switch places
                const replacingStage = stages[newStageIndex];
                stages[newStageIndex] = stages[currentStageIndex];
                stages[currentStageIndex] = replacingStage;
                setStages(s => [...s]);
            }
        }
    }


    return (
        <>
            <Nav />
            <div className='p-4 grid grid-cols-1 gap-4'>
                {boards.map((board, index) => (
                    <Board key={index} board={board} editBoard={editBoard} addStage={addStage} addBoard={addBoard}>
                        {stages
                            .filter((stage) => stage.board === board.id)
                            .map((stage, index) => (
                                <Stage key={index} stage={stage} editStage={editStage} deleteStage={deleteStage} addTask={addTask} moveStage={moveStage}>
                                    {tasks
                                        .filter((task) => task.stage === stage.id)
                                        .map((task, index) => (
                                            <Task key={index} task={task} editTask={editTask} deleteTask={deleteTask} moveTask={moveTask} />
                                        ))}
                                </Stage>
                            ))}
                    </Board>
                ))}
            </div>
        </>
    )
}

export default App;
