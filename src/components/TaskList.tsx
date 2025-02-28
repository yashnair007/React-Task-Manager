import React, { useEffect, useState } from "react";
import { Table, message, Button, Popconfirm, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { getTasks, deleteTask, executeTask } from "../services/taskServices";
import dayjs from "dayjs";

interface TaskExecution {
  startTime: string;
  endTime: string;
  output: string;
}

interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
  taskExecutions?: TaskExecution[];
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      message.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      message.success("Task deleted successfully");
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      message.error("Failed to delete task.");
    }
  };

  const handleExecuteTask = async (id: string) => {
    try {
      await executeTask(id);
      message.success("Task executed successfully!");
      loadTasks();
    } catch (error) {
      console.error("Error executing task:", error);
      message.error("Failed to execute task.");
    }
  };

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    setFilteredTasks(tasks.filter((task) => task.name.toLowerCase().includes(value)));
  };

  const columns: ColumnsType<Task> = [
    {
      title: "Task Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Button type="link" onClick={() => navigate(`/task/${record.id}`)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Command",
      dataIndex: "command",
      key: "command",
    },
    {
      title: "Last Execution Time",
      dataIndex: "taskExecutions",
      key: "lastExecution",
      render: (executions?: TaskExecution[]) =>
        executions && executions.length > 0
          ? dayjs(executions[executions.length - 1].endTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          : "Never executed",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleExecuteTask(record.id)}
            style={{ marginRight: 8 }}
          >
            Execute
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      {/* Search Bar */}
      <Input
        placeholder="Search tasks by name..."
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: 16, width: "50%" }}
      />
      {/* Task Table */}
      <Table
        columns={columns}
        dataSource={filteredTasks}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default TaskList;
