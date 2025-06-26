import { Routes, Route } from "react-router-dom"; 
import Dashboard from "./pages/Dashboard";
import MovieList from "./pages/MovieList";
import { Navbar } from "./components/Navbar";

function App() {
  return (
  
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movies" element={<MovieList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;