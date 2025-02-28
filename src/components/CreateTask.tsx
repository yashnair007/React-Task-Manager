import React, { useState } from "react";
import axios from "axios";

const CreateTask: React.FC = () => {
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [command, setCommand] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9090/tasks", {
                name,
                owner,
                command: command || null,
            });
            alert("Task created successfully!");
            console.log("Created Task:", response.data);
            setName("");
            setOwner("");
            setCommand("");
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Failed to create task.");
        }
    };

    return (
        <div className="p-4 border rounded shadow-md">
            <h2 className="text-lg font-bold mb-3">Create New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    placeholder="Task Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    required
                    className="border p-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Command (optional)"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    className="border p-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create Task
                </button>
            </form>
        </div>
    );
};

export default CreateTask;
