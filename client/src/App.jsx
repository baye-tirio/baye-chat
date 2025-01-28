import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import SignUpPage from "./pages/SignUpPage";
import {Toaster} from 'react-hot-toast';
import { useThemeStore } from "./store/useThemesStore";

function App() {
  const { authUser, checkAuth, onlineUsers} = useAuthStore();
  const { theme, setTheme } = useThemeStore ();
  useEffect(() => {
    checkAuth();
  }, []);
  // console.log("The authenticated user is:");
  // console.log(authUser);
  console.log("This is from the app.jsx component");
  console.log({onlineUsers});
  return (
    <div data-theme = {theme}>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/log-in" />}
        />
        <Route
          path="/sign-up"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/log-in"
          element={!authUser ? <LogInPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/log-in" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
