import { Route, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import HomeComponent from "./components/Home";
import { ToastContainer } from "react-toastify";
import AuthLoginProvider from "./Context/AuthProvider";
import UsersComponent from "./components/Users";
import CoursesComponent from "./components/Course";
import HistoryComponent from "./components/History";
import ViewChatHistory from "./components/ViewChatHistory";
import Setting from "./components/Setting";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthLoginProvider>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/home" element={<HomeComponent />}>
            <Route path="" element={<UsersComponent />} />
            <Route path="courses" element={<CoursesComponent />} />
            <Route path="history" element={<HistoryComponent />} />
            <Route path="setting" element={<Setting />} />
          </Route>
          <Route
            path="view-chat-history/:roomId"
            element={<ViewChatHistory />}
          />
        </Routes>
        <ToastContainer />
      </AuthLoginProvider>
    </div>
  );
}

export default App;
