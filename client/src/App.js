import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import GoogleCallback from "./components/GoogleCallback";

function App() {
  const user = localStorage.getItem("token");

  const handleGoogleLoginSuccess = (res) => {
    localStorage.setItem("token", res.token);
    window.location.href = "/";
  };

  const handleGoogleLoginFailure = (error) => {
    console.log(error);
  };
  
  return (
    <Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/google/callback" element={<GoogleCallback />} />
			<Route path="/google/callback" element={<GoogleCallback onLoginSuccess={handleGoogleLoginSuccess} onLoginFailure={handleGoogleLoginFailure} />} />
		</Routes>
  );
}

export default App;
