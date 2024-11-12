import ReactDOM from "react-dom/client";
import { Offline, Online } from "react-detect-offline";
import { Alert } from "antd";

import MovieApp from "./components/movie-app/movie-app";

function App() {
  return (
    <>
      <Online>
        <div>
          <MovieApp />
        </div>
      </Online>
      <Offline>
        <Alert
          type="error"
          message={`Oops, no internet connection, babygirl`}
        />
      </Offline>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
