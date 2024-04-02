import React from 'react'
import { Link } from "react-router-dom";
import no_image from '../assets/images/no_image.jpg';

export const Article = ({ title, description, image,id }) => {

    const shortDescription = description.split(' ').slice(0, 10).join(' ');
    return (
        <div className="rounded-xl w-80 shadow-md p-5 text-slate-700 bg-white">
            <div >
                <img className='rounded-lg' src={image ? image : no_image} alt="Article image" />
            </div>
            <h1 className='font-bold text-xl mt-2'>
                {title}
            </h1>
            <div className='py-3'>{shortDescription}...</div>
            <Link className='btn' to={`/article/${id}`}>
                Read Article
            </Link>
            {/* <button>
            Add to Read Later
        </button> */}

        </div>
    )
}
