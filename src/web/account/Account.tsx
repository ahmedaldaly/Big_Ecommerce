import React from 'react'
import SideBar from './SideBar'
import { Route ,Routes } from 'react-router-dom'
import PersonalInformation from './PersonalInformation'
const Account = () => {
  return (
    <div>
        <SideBar/>
<Routes>
    <Route path='/Personal-information' element={<PersonalInformation/>}/>
</Routes>
    </div>
  )
}

export default Account