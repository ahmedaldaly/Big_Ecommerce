import { createRoot } from 'react-dom/client'
import './index.css'
import App from './web/App.tsx'
import './i18n';
import {BrowserRouter , Route ,Routes} from 'react-router-dom'
import Register from './web/register/Register.tsx';
import Admin from './admin/Admin.tsx';


createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    
    <Routes>
  <Route path='/*' element={<App/>}/>
  <Route path='/admin' element={<Admin/>}/>
</Routes>
  </BrowserRouter>,
)
