import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import HomeView from "./views/HomeView";
import DetailsAnime from "./views/DetailsAnime";
import StreamAnime from "./views/StreamAnime";
import SearchResult from "./views/SearchResult";
import Navbar from "./layouts/Navbar";
import NotFound from "./views/NotFound";


function App() {
 
    return(
      <Router>
          <Routes>
              <Route path="" element={<Navbar />}>
                <Route path="/" element={<HomeView />}></Route>
                <Route path="/anime/:id" element={<DetailsAnime />}></Route>
                <Route path="/stream/:episode" element={<StreamAnime />}></Route>
                <Route path="/search" element={<SearchResult />}></Route>
              </Route>
              <Route path="*" element={<Navigate to={'/not-found'} replace/>}></Route>
              <Route path="/not-found" element={<NotFound  />}></Route>
          </Routes>
        </Router>
    )
  
}

export default App;
