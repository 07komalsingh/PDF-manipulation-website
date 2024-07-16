import React from 'react'
import add_page from '../assets/img_add.png'
import img_merge from '../assets/img_merge.png'
import img_split from '../assets/img_split.png'
import img_recorder from '../assets/img_recorder.png'
import img_remove from '../assets/img_remove.png'
import img_blankPage from '../assets/img_blank_page.png'
import img_convert from '../assets/img_convert.png'

const tools = [
    { name: 'Merge PDF', icon: img_merge },
    { name: 'Split PDF', icon: img_split },
    { name: 'Recorder PDF', icon: img_recorder },
    { name: 'Remove Pages', icon: img_remove },
    { name: 'Add Blank Page', icon: img_blankPage },
    { name: 'Convert to docs', icon: img_convert },
    { name: 'Add Pages', icon: add_page },

];
function Tools() {

    return (
        <div>
            <h2 className='font-poppins font-bold place-items-center flex justify-center  text-black lg:text-4xl  text-2xl  m-8'>Our popular Tools </h2>

            <div className="grid bg-[#E5F2F33D] 2xl:px-80 py-10 gap-28 lg:grid-cols-3 md:grid-cols-3 md:text-center sm:grid-cols-1 place-items-center sm:px-6 md:gap-2 px-4">

                {tools.map((item, i) => (
                    <div key={i} className='bg-[#C5E7E9] rounded-2xl  flex items-center justify-center font-poppins  md:max-w-auto py-10 gap-1 w-full md:text-center  lg:w-[21vw] '>

                        <img src={item.icon} className='' />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>


        //     <div className=''>
        //         <h2 className='font-poppins font-bold place-items-center flex justify-center  text-black lg:text-4xl  text-2xl  m-8'>Our popular Tools </h2>
        //         <div className=' bg-[#E5F2F3] place-items-center gap-4 grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 w-full mt-9 py-4 px-2 sm:px-0  '>

        //             {tools.map((item, i) => (
        //                 <div key={i} className='bg-[#C5E7E9] border-2 rounded-2xl  flex items-center justify-center font-poppins px-6 md:max-w-lg py-10 gap-4 w-full  md:w-[30vw] '>

        //                         <img src={item.icon} className='' />
        //                         <p>{item.name}</p>
        //                 </div>
        //             ))}

        //         </div>
        //     </div>
    );
}
export default Tools
