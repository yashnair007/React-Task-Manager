import React from "react";
import { Layout, Typography } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask";
import TaskDetails from "./components/TaskDetails"; // Import TaskDetails
// No need to import EditTask here; it's already used inside TaskDetails

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ background: "#001529", padding: "10px 20px" }}>
          <Typography.Title style={{ color: "#fff", margin: 0 }} level={2}>
            Task Management
          </Typography.Title>
        </Header>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<><CreateTask /><TaskList /></>} />
            <Route path="/task/:taskId" element={<TaskDetails />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
