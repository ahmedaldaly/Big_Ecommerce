import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n';
import Header from './components/Header/Header.tsx';
import {BrowserRouter , Route ,Routes} from 'react-router-dom'
import Register from './register/Register.tsx';


createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <Header/>
    <Routes>
  <Route path='/' element={<App/>}/>
  <Route path='/register' element={<Register/>}/>
</Routes>
  </BrowserRouter>,
)
