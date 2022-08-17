import "./App.css";
import Table from "./Components/Table";
import Form from "./Components/Form";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Table />}></Route>
          <Route path="/newuser" element={<Form />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
