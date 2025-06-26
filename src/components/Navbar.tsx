import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-bold">Razzie Awards</h1>
      <div className="flex gap-4">
        <Link to="/" className="text-gray-300 hover:text-white">
          Dashboard
        </Link>
        <Link to="/movies" className="text-gray-300 hover:text-white">
          Lista de Filmes
        </Link>
      </div>
    </nav>
  );
}