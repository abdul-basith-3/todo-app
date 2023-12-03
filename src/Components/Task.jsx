import axios from 'axios';
import { BsCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
function Task() {
    const [textdesc, setTask] = useState("");
    const [tasks, settasks] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);


    async function Load() {
        const result = await axios.get(
            "http://localhost:8080/todos");
        settasks(result.data);
        console.log(result.data);
    }
    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/todos",
                {

                    "text": textdesc,
                    "completed": "false"

                });
            alert("Input succesful");
            setTask("");
        } catch (err) {
            alert("Failed");
        }
    }
    return (
        <div className='home'>
            <h1>Todo List
            </h1>
            <div className="create_form">
                <button type="button" onClick={save}>Add</button>
                <input type="text" name="" id="textdesc" placeholder="Add a task" onChange={(event) => setTask(event.target.value)}></input>
            </div>
            <br />

            {tasks.map(task => (
                <div className='taskdes'>
                    <div className='box'>
                        <input type="checkbox" name="example_checkbox"/>
                    </div>
                    <label>{task.text}</label>


                </div>
            )
            )}
        </div>
    );
}

export default Task;