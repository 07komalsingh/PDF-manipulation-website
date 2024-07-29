

import React from 'react';

import { Link } from 'react-router-dom';
import add_page from '../assets/img_add.png';
import img_merge from '../assets/img_merge.png';
import img_split from '../assets/img_split.png';
import img_recorder from '../assets/img_recorder.png';
import img_remove from '../assets/img_remove.png';
import img_blankPage from '../assets/img_blank_page.png';
import img_convert from '../assets/img_convert.png';

const tools = [
    { name: 'Merge PDF', icon: img_merge, path: '/merge' },
    { name: 'Split PDF', icon: img_split, path: '/split' },
    { name: 'Recorder PDF', icon: img_recorder, path: '/recorder' },
    { name: 'Remove Pages', icon: img_remove, path: '/remove' },
    { name: 'Add Blank Page', icon: img_blankPage, path: '/add_blank' },
    { name: 'Pdf to docs', icon: img_convert, path: '/convert' },
    { name: 'Add Image', icon: add_page, path: '/add-image' },

];

function Tools() {


    return (
        <div className='w-full mt-14'>
            <h2 className='font-poppins font-bold place-items-center flex justify-center  text-black lg:text-4xl  text-2xl  m-3 md:m-8'>Our popular Tools </h2>

            <div className="grid bg-[#E5F2F33D] 2xl:px-[300px] lg:px-44  py-10 sm:gap-28 gap-7 lg:grid-cols-3 md:grid-cols-3 md:text-center sm:grid-cols-1 place-items-center sm:px-6 md:gap-2  px-4">

                {tools.map((item, i) => (
                    <Link
                        key={i}
                        to={item.path}
                         className='bg-[#C5E7E9] rounded-2xl  flex items-center justify-center font-poppins  md:max-w-auto py-10 gap-1 w-full md:text-center  lg:w-[21vw] '>

                        <img src={item.icon} className='' />
                        <p className='font-semibold'>{item.name}</p>
                    </Link>

                ))}
            </div>
        </div>
    );
}

export default Tools;
