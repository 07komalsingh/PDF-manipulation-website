import React from 'react'


const tools = [
    { name: 'Merge PDF', icon: "../src/assets/Merge.png" },
    { name: 'Split PDF', icon: '../src/assets/Split.png' },
    { name: 'Recorder PDF', icon: '../src/assets/recorder.png' },
    { name: 'Remove Pages', icon: '../src/assets/remove.png' },
    { name: 'Add Blank Page', icon: '../src/assets/blank_page.png' },
    { name: 'Convert to docs', icon: '../src/assets/convert.png' },
    { name: 'Add Pages', icon: '../src/assets/Add.png' },

];

function Tools() {

    return (

        <div>
            <h2 className='font-poppins font-bold place-items-center flex justify-center  text-black lg:text-4xl  text-2xl  m-8'>Our popular Tools </h2>

            <div className="grid bg-[#E5F2F3] 2xl:px-80 py-10 gap-20 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-items-center md:gap-8">

                {tools.map((item, i) => (
                    <div key={i} className='bg-[#C5E7E9] rounded-2xl  flex items-center justify-center font-poppins  md:max-w-lg py-10 gap-1 w-full md:text-center sm:ml-10  md:w-[20vw] '>

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
