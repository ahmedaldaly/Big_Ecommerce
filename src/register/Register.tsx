import React from 'react'
import { useTranslation } from 'react-i18next'
const Register = () => {
    const {i18n} = useTranslation()
    const Arabic = i18n.language ==='ar'
  return (
    <div>{Arabic ? 'تسجيل الدخول':'Log In'}</div>
  )
}

export default Register