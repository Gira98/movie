import ReactDOM from 'react-dom/client'

import MovieApp from './components/movie-app/movie-app'

function App() {
  return (
    <div>
      <MovieApp />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
