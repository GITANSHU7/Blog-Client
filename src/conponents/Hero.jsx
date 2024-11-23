import React, { useState } from "react";
import CoverImage from "../../public/images/coverImage.jpg";
import AddPost from "./AddPost";

const Banner = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateClick = () => {
    setCreateModalOpen(true);
};


  return (
    <div className="relative bg-gray-800 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${CoverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Banner Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center space-y-4 md:py-32">
        <h1 className="text-3xl md:text-5xl font-bold">
        Discover Amazing Articles and Boost Your Blogging Career
        </h1>
        <p className="text-sm md:text-lg max-w-2xl">
        Explore a wide range of articles, tips, and insights designed to make your blogging journey even more exciting! Whether you're looking for fresh ideas, expert advice, or creative inspiration, you'll find it all here. Got an idea you'd love to share? Don’t forget to reach out – we'd love to hear from you!
        </p>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600" onClick={handleCreateClick}>
          Create Blog
        </button>
      </div>
     <AddPost isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} handleCreateClick={handleCreateClick} />

    </div>
    
  );
};

export default Banner;

