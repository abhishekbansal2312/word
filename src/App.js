import Word from "./Word";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster position="right top" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Word />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
