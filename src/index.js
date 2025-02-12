import ReactDOM from "react-dom/client";


import MovieApp from "./components/movie-app/movie-app";

function App() {
  return <MovieApp />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
