import React from "react";

const PostCard = ({ imageUrl, category, title, description, author, time }) => {
 console.log(`${import.meta.env.VITE_BACKEND_URL}/${imageUrl}`)
    return (
        <div className="max-w-sm rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <img src={`${import.meta.env.VITE_BACKEND_URL}/${imageUrl}`} alt={title} className="w-full h-[10rem] object-cover rounded-t-lg" />
            <div className="p-4">
            <span
                    className={`justify-start inline-block px-3 py-1 text-sm font-semibold rounded-full ${category === "Technology"
                            ? "bg-blue-100 text-blue-800"
                            : category === "Food"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-red-100 text-red-800"
                        }`}
                >
                    {category}
                </span>
               
                <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{description}</p>
                {/* <div className="flex items-center mt-4">
                    <img
                        src={author.image}
                        alt={author.name}
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="ml-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {author.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default PostCard;