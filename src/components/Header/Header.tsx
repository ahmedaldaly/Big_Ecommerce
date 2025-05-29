import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import { BsCamera } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import {Link} from 'react-router-dom'
const Header = () => {
    const { i18n } = useTranslation();
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClearSearch = () => {
        setSearchValue('');
        // إعادة التركيز إلى حقل البحث بعد المسح
    };

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <header className='w-full h-16 bg-gray-50 max-md:justify-between max-md:px-5 flex justify-evenly items-center '>
            <span className=' flex justify-center items-center gap-2'>
            <IoMenu className='hidden max-md:flex text-3xl text-[#BE86F7] cursor-pointer '/>
            <Link to='/'>
            <img src="/assets/logo.png" alt="Logo" className='w-24 max-md:w-16' />
            </Link>
            </span>

            {/* Search Bar */}
            <div className='relative flex justify-center items-center'>
                <div className='relative'>
                    <input
                        ref={inputRef}
                        type="text"
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder={i18n.language === 'ar' ? 'ابحث عن' : 'Search for'}
                        className='px-10 py-2 rounded-full max-sm:hidden border-2 border-gray-300 pl-10 w-[320px] max-lg:w-[250px] h-10 focus:outline-none focus:border-blue-500 transition-all duration-300'
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    {/* Search Icon */}
                    <div className={`absolute max-sm:hidden inset-y-0 flex items-center px-3 ${i18n.language === 'ar' ? 'right-1' : 'left-1'}`}>
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    {/* Clear Button or Camera Icon */}
                    <div className={`absolute max-sm:hidden inset-y-0 gap-2 flex items-center px-3 ${i18n.language === 'ar' ? 'left-1' : 'right-1'}`}>
                        {searchValue ? (
                            <RiCloseFill
                                onClick={handleClearSearch}
                                className='w-7 h-7 hover:bg-gray-100 flex justify-center items-center rounded-full hover:text-red-500 text-xl text-gray-500 cursor-pointer'
                            />
                        ) : (
                            <BsCamera className='w-5 h-5 text-xl text-gray-500' />
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className='flex justify-center items-center gap-5 max-lg:gap-0'>
            <div className='max-md:flex justify-center items-center hidden hover:text-blue-500 hover:scale-105 w-auto px-2 h-10 hover:rounded-md duration-300 hover:bg-gray-100 gap-1'>
                    <IoSearchOutline className='text-xl'/>
                </div>
                <div className='flex justify-center items-center hover:text-blue-500 hover:scale-105 w-auto px-2 h-10 hover:rounded-md duration-300 hover:bg-gray-100 gap-1'>
                    <IoMdHeartEmpty className='text-xl' />
                    <span className='max-md:hidden'>{i18n.language === 'ar' ? 'المفضلة' : 'Favorites'}</span>
                </div>

                <div className='flex justify-center items-center hover:text-blue-500 hover:scale-105 w-auto px-2 h-10 hover:rounded-md duration-300 hover:bg-gray-100 gap-1'>
                    <FiShoppingCart className='text-xl' />
                    <span className=' max-md:hidden'>{i18n.language === 'ar' ? 'السلة' : 'Cart'}</span>
                </div>

                <Link to ='/register' className='flex justify-center items-center hover:text-blue-500 hover:scale-105 w-auto px-2 h-10 hover:rounded-md duration-300 hover:bg-gray-100 gap-1'>
                    <LuUserRound className='text-xl'/>
                    <span className='max-md:hidden'>{i18n.language === 'ar' ? 'حسابي' : 'My Account'}</span>
                </Link>
              

                <button
                    onClick={() => changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
                    className='flex max-md:hidden justify-center items-center hover:text-blue-500 hover:scale-105 w-auto px-2 h-10 hover:rounded-md duration-300 hover:bg-gray-100 gap-1 cursor-pointer'
                >
                    {i18n.language === 'ar' ? 'English' : 'اللغة العربية'}
                </button>
            </div>
        </header>
    );
};

export default Header;
