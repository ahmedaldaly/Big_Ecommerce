import React from 'react'
import { useTranslation } from 'react-i18next'
const PersonalInformation = () => {
    const {i18n} = useTranslation()
    const Arabic = i18n.language === 'ar'
  return (
    <div className={`w-[calc(100%-250px)] min-h-[91vh]  ${Arabic ? 'mr-[250px]':'ml-[250px]'} `}>
        
    </div>
  )
}

export default PersonalInformation