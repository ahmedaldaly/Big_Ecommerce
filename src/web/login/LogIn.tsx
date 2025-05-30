import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from "react-hook-form"
import { LuEyeClosed } from "react-icons/lu"
import { VscEye } from "react-icons/vsc"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BaseUrl } from '../../components/BaseUrl'
import cookie from 'js-cookie'

type FormData = {
  email: string
  
  password: string
}

const LogIn = () => {
  const { i18n } = useTranslation()
  const Arabic = i18n.language === 'ar'

  const [showPassword, setShowPassword] = useState(false)
  const [loadimg, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true)
      const res = await axios.post(`${BaseUrl}/api/vl/auth/login`, {
       
        email: data.email,
        password: data.password,
      })

      if (res.status === 201) {
        cookie.set('token', res.data.token)
        setMessage(Arabic ? 'تم إنشاء الحساب بنجاح' : 'Account created successfully')
        setMessageType('success')
        setLoading(false)
        window.location.href = '/'
      }
    } catch (err: any) {
      setLoading(false)
      const errorMessage = err.response?.data?.message || (Arabic ? 'حدث خطأ أثناء التسجيل' : 'An error occurred during registration')
      setMessage(errorMessage)
      setMessageType('error')
    }
  })

  return (
    <div className='w-[390px] h-auto flex  flex-wrap mx-auto mt-10'>
      <h1 className='text-2xl font-bold my-4'>
        {Arabic ? 'انشاء حساب ' : 'Create Account'}
      </h1>
      <p className='text-sm text-gray-700'>
        {Arabic ? 'انشئ حسابك بكل سهوله واستمتع باحدث العروض' : "Create an account with ease and enjoy the latest offers"}
      </p>

      {/* ✅ رسالة النجاح أو الخطأ */}
      {message && (
        <div className={`w-full my-2 text-sm font-medium ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}

      <form onSubmit={onSubmit} className='my-5 w-full'>
       

        <label>{Arabic ? 'البريد الالكتروني' : 'Email'}</label>
        <input
          placeholder={Arabic ? 'ادخل البريد الالكتروني' : 'Enter your email'}
          className='w-full mb-5 mt-2 px-5 border-2 border-gray-300 rounded-md h-10'
          type='email'
          {...register("email")}
        />

        <label>{Arabic ? 'كلمة السر' : 'Password'}</label>
        <div className='relative'>
          <input
            placeholder={Arabic ? 'ادخل كلمة السر' : 'Enter your password'}
            className='w-full px-5 mt-2 border-2 border-gray-300 rounded-md h-10 pr-10'
            type={showPassword ? 'text' : 'password'}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className={`absolute cursor-pointer ${Arabic ? 'left-3' : 'right-3'} top-1/2 text-xl transform -translate-y-1/2 text-gray-500`}
          >
            {showPassword ? <VscEye /> : <LuEyeClosed />}
          </button>
        </div>

        <button
          type="submit"
          className='w-full cursor-pointer hover:bg-[#56129C] transition-all duration-300 px-5 bg-[#7016CD] text-white mt-10 rounded-md h-10'
        >
          {Arabic ? 'انشاء حساب' : 'Create Account'}
        </button>
      </form>

      <Link to="/login" className='font-bold text-[#7016CD] text-sm'>
        {Arabic ? 'هل لديك حساب ؟ ' : 'Already have an account? '}
      </Link>
    </div>
  )
}

export default LogIn
