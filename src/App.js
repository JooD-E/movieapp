import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Movies from "./pages/Movies";
import TopMovies from "./pages/TopMovies";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import MovieDetail from "./pages/MovieDetail";
import Upcoming from "./pages/Upcoming";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter>
     {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
      <Header/>
     <Routes>
      <Route path="/" exact={true} element={<Home/>}/>
      <Route path="movie_now" element={<Movies/>}/>
 <Route path="/movie/:title" element={<MovieDetail/>}/>     
 <Route path="movie_top" element={<TopMovies/>}/>
 <Route path="/movie/:title" element={<MovieDetail/>}/>
 <Route path="upcoming" element={<Upcoming/>}/>
<Route path="/upcoming/:title" element={<MovieDetail/>}/>
   <Route path="*" element={<NotFound/>}/>    
     </Routes>
      <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
