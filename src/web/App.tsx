import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';
import {  Route ,Routes} from 'react-router-dom'
import Register from './register/Register';
import LogIn from './login/LogIn';
import Profile from './profile/Profile';
import Account from './account/Account';

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
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/account/*' element={<Account/>}/>
    </Routes>
    </div>
  );
};

export default Home;
