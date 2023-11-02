import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";
import NoPage from "./pages/NoPage";
import Sign from "./pages/Sign";
import Footer from "./components/footer";
import Passwords from "./pages/Passwords"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="passwords" element={<Passwords />} />
          <Route path="signin" element={<Sign />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
        <Footer></Footer>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);