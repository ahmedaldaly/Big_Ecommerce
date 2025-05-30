import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { LuEyeClosed } from "react-icons/lu";
import { VscEye } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../../components/BaseUrl';
import cookie from 'js-cookie';

type FormData = {
  email: string;
  password: string;
};

const LogIn = () => {
  const { i18n } = useTranslation();
  const Arabic = i18n.language === 'ar';

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${BaseUrl}/api/vl/auth/login`, {
        email: data.email,
        password: data.password,
      });

   
        cookie.set('token', res.data.token);
        setMessage(Arabic ? 'تم تسجيل الدخول' : 'Log in successful');
        setMessageType('success');
        setLoading(false);
      window.location.href = '/';
      
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      const errorMessage =
        err.response?.data?.message ||
        (Arabic ? ' تحقق من بياناتك' : 'check your data');
      setMessage(errorMessage);
      setMessageType('error');
    }
  });

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div className='w-[390px] h-auto flex flex-wrap mx-auto mt-10'>
      <h1 className='text-2xl font-bold my-4'>
        {Arabic ? 'تسجيل الدخول' : 'Log In'}
      </h1>

      {message && (
        <div
          className={`w-full my-2 text-sm font-medium ${
            messageType === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={onSubmit} className='my-5 w-full'>
        <label>{Arabic ? 'البريد الالكتروني' : 'Email'}</label>
        <input
          placeholder={Arabic ? 'ادخل البريد الالكتروني' : 'Enter your email'}
          className='w-full mb-1 mt-2 px-5 border-2 border-gray-300 rounded-md h-10'
          type='email'
          {...register("email", {
            required: Arabic ? 'البريد الإلكتروني مطلوب' : 'Email is required',
          })}
        />
        {errors.email && (
          <p className='text-red-600 text-sm mb-4'>{errors.email.message}</p>
        )}

        <label>{Arabic ? 'كلمة السر' : 'Password'}</label>
        <div className='relative'>
          <input
            placeholder={Arabic ? 'ادخل كلمة السر' : 'Enter your password'}
            className='w-full px-5 mt-2 border-2 border-gray-300 rounded-md h-10 pr-10'
            type={showPassword ? 'text' : 'password'}
            {...register("password", {
              required: Arabic ? 'كلمة السر مطلوبة' : 'Password is required',
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className={`absolute cursor-pointer ${Arabic ? 'left-3' : 'right-3'} top-1/2 text-xl transform -translate-y-1/2 text-gray-500`}
          >
            {showPassword ? <VscEye /> : <LuEyeClosed />}
          </button>
        </div>
        {errors.password && (
          <p className='text-red-600 text-sm mt-2'>{errors.password.message}</p>
        )}

        <button
          type="submit"
          className='w-full cursor-pointer hover:bg-[#56129C] transition-all duration-300 px-5 bg-[#7016CD] text-white mt-10 rounded-md h-10'
        >
          {loading
            ? Arabic
              ? 'جار التحميل ...'
              : 'Loading...'
            : Arabic
              ? 'تسجيل الدخول'
              : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default LogIn;
