import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Errorpage from "./pages/errorpage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
