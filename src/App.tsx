import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import Browse from "@/pages/Browse";
import Random from "@/pages/Random";
import TaskDetail from "@/pages/TaskDetail";
import Submit from "@/pages/Submit";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/random" element={<Random />} />
        <Route path="/task/:id" element={<TaskDetail />} />
        <Route path="/submit" element={<Submit />} />
      </Routes>
    </Router>
  );
}
