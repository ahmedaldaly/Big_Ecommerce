import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';
import {  Route ,Routes} from 'react-router-dom'
import Register from './register/Register';
import LogIn from './login/LogIn';

const Home = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang:string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
    <Header/>
    <Routes>
      <Route path='/' element={''}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<LogIn/>}/>
    </Routes>
    </div>
  );
};

export default Home;
