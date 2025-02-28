import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { Task } from "../services/taskServices"; 
import { updateTask } from "../services/taskServices"; 

interface EditTaskProps {
  visible: boolean;
  onClose: () => void;
  task: Task | null;
  onTaskUpdated: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ visible, onClose, task, onTaskUpdated }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        name: task.name,
        owner: task.owner,
        command: task.command,
      });
    }
  }, [task, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (task && task.id) {
        await updateTask(task.id, values);
        message.success("Task updated successfully!");
        onTaskUpdated(); // Callback to refresh task data
        onClose(); // Close the modal after update
      }
    } catch (error) {
      message.error("Failed to update task.");
    }
  };

  return (
    <Modal
      title="Edit Task"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="edit_task_form">
        <Form.Item
          name="name"
          label="Task Name"
          rules={[{ required: true, message: "Please input the task name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="owner"
          label="Owner"
          rules={[{ required: true, message: "Please input the task owner!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="command"
          label="Command"
          rules={[{ required: true, message: "Please input the command!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTask;
