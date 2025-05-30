import { useEffect, useState } from "react";
import {MoonLoader } from 'react-spinners'
import { useLocation, useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    if (token) {
      cookie.set('token', token); // حفظ التوكن
      // انتظر ثانيتين ثم تحويل المستخدم
      setTimeout(() => {
        setLoading(false);
        navigate('/'); // تحويل للصفحة الرئيسية
      }, 2000);
    } else {
      // لو مفيش توكن، برضو نحوله للصفحة الرئيسية
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className='w-full h-screen  absolute top-0 left-0 bg-white/50 backdrop-blur-2xl flex justify-center items-center '>
     <MoonLoader /> 
    </div>
  );
}

export default Profile;
