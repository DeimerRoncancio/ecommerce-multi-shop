import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login.tsx'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
)
