import Task from "./TaskPage/task.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          limit={4}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />

        <Routes>
          <Route path="/" element={<Task />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
