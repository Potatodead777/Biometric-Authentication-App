import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, HashRouter} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Request from "./pages/Request";
import Signin from "./pages/Signin";
import Test from "./Test";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="request" element={<Request />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);root.render(<App />);
