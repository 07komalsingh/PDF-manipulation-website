import React from 'react';
import { useNavigate } from 'react-router-dom';
import add_page from '../assets/img_add.png';
import img_merge from '../assets/img_merge.png';
import img_split from '../assets/img_split.png';
import img_recorder from '../assets/img_recorder.png';
import img_remove from '../assets/img_remove.png';
import img_blankPage from '../assets/img_blank_page.png';
import img_convert from '../assets/img_convert.png';


const tools = [
    { name: 'Merge PDF', icon: img_merge, path: '/merge' },
    { name: 'Split PDF', icon: img_split, path: '/file', toolPath: '/split' },
    { name: 'Reorder PDF', icon: img_recorder, path: '/reorder'},
    { name: 'Remove Pages', icon: img_remove, path: '/file', toolPath: '/remove' },
    { name: 'Add Blank Page', icon: img_blankPage, path: '/file', toolPath: '/add_blank' },
    { name: 'PDF to Docs', icon: img_convert, path: '/convert' },
    { name: 'Add Signature', icon: add_page, path: '/add-signature' },
    { name: 'Compress PDF', icon: img_remove, path: '/file', toolPath: '/compress' },
    { name: 'Read PDF', icon: img_remove, path: '/file', toolPath: '/read' },
];
 
function Tools() {
    const navigate = useNavigate();
 
    const handleClick = (path, toolPath) => {
        if (toolPath) {
            navigate(path, { state: { toolPath } });
        } else {
            navigate(path);
        }
    };
 
    return (
        <div className='w-full sm:mt-14'>
            <h2 className='font-poppins font-bold place-items-center flex justify-center text-black lg:text-4xl text-2xl m-3 md:m-8'>Our popular Tools </h2>
            <div className="grid bg-[#E5F2F33D] 2xl:px-[350px] lg:px-44 py-14 sm:gap-28 gap-10 lg:grid-cols-3 md:grid-cols-3 md:text-center sm:grid-cols-1 place-items-center sm:px-6 md:gap-2 px-4 ">
                {tools.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => handleClick(item.path, item.toolPath)}
                        className="bg-[#C5E7E9] rounded-2xl flex flex-col items-center justify-center p-6 w-full max-w-sm text-center cursor-pointer hover:bg-[#b9e2e4]"
                    >
                        <img src={item.icon} className="mb-4" alt={item.name} />
                        <p className="font-semibold">{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Tools;

