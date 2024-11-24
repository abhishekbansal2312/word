import Word from "./Word";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Word />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
