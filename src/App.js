import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import DetailsAnime from "./views/DetailsAnime";
import StreamAnime from "./views/StreamAnime";

function App() {
  return (
    <div>
          <Router>
            <Routes>
              <Route path="/" element={<HomeView />}></Route>
              <Route path="/anime/:id" element={<DetailsAnime />}></Route>
              <Route path="/stream/:episode" element={<StreamAnime />}></Route>
            </Routes>
          </Router>
    </div>
  );
}

export default App;
