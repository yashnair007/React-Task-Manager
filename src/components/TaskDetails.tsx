import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Card, message, Button, Modal, Form, Input } from "antd";
import { getTaskById, executeTask, updateTask } from "../services/taskServices"; 
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

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [executing, setExecuting] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadTaskDetails();
  }, [id]);

  const loadTaskDetails = async () => {
    try {
      setLoading(true);
      const data = await getTaskById(id!);
      setTask(data);
    } catch (error) {
      console.error("Error fetching task details:", error);
      message.error("Failed to load task details.");
    } finally {
      setLoading(false);
    }
  };

  const handleExecute = async () => {
    try {
      setExecuting(true);
      await executeTask(id!);
      message.success("Task executed successfully!");
      loadTaskDetails();
    } catch (error) {
      console.error("Error executing task:", error);
      message.error("Failed to execute task.");
    } finally {
      setExecuting(false);
    }
  };

  const handleEdit = () => {
    form.setFieldsValue({
      name: task?.name,
      owner: task?.owner,
      command: task?.command,
    });
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleUpdateTask = async () => {
    try {
      const updatedTask = form.getFieldsValue();
      await updateTask(id!, updatedTask);
      message.success("Task updated successfully!");
      loadTaskDetails();
      setEditing(false); // Close the modal
    } catch (error) {
      console.error("Error updating task:", error);
      message.error("Failed to update task.");
    }
  };

  const columns = [
    {
      title: "Start Time",
      dataIndex: "startTime",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Output",
      dataIndex: "output",
    },
  ];

  if (loading) return <p>Loading task details...</p>;

  return (
    <Card title={`Task Details: ${task?.name}`} style={{ maxWidth: 800, margin: "auto" }}>
      <p><strong>Owner:</strong> {task?.owner}</p>
      <p><strong>Command:</strong> {task?.command}</p>

      <Button type="primary" onClick={handleExecute} loading={executing} style={{ marginRight: 8 }}>
        Execute Task
      </Button>

      <Button onClick={handleEdit} style={{ marginLeft: 8 }}>
        Edit Task
      </Button>

      <h3 style={{ marginTop: 20 }}>Execution History</h3>
      <Table columns={columns} dataSource={task?.taskExecutions || []} rowKey="startTime" pagination={{ pageSize: 5 }} />

      <Modal
        title="Edit Task"
        visible={editing}
        onCancel={handleCancelEdit}
        onOk={handleUpdateTask}
        confirmLoading={executing}
      >
        <Form
          form={form}
          layout="vertical"
          name="editTaskForm"
          initialValues={{
            name: task?.name,
            owner: task?.owner,
            command: task?.command,
          }}
        >
          <Form.Item label="Task Name" name="name" rules={[{ required: true, message: "Please enter the task name" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Owner" name="owner" rules={[{ required: true, message: "Please enter the task owner" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Command" name="command" rules={[{ required: true, message: "Please enter the task command" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default TaskDetails;
