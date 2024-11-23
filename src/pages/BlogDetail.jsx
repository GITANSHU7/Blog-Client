import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function formatDateToDDMMYY(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
}

const BlogDetail = () => {

    const { id } = useParams();
    const [data, setData] = useState(null);

    const getThePost = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/post/${id}`
            );
            setData(response?.data?.data);
        } catch (error) {
            console.error(error.message || "Error fetching post details");
            throw error;
        }
    }

    useEffect(() => {
        getThePost();
    }, []);

    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="bg-green-900 p-6">
            <h2 className="text-white text-2xl font-bold">{data?.title}</h2>
            <p className="text-green-300 mt-2">
              BY {data?.author} — {formatDateToDDMMYY(data?.createdAt)}
            </p>
          </div>

          <div>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${data?.imageUrl}`}
              alt={data?.title}
              className="w-full object-cover xl:h-96 lg:h-72 md:h-56 sm:h-48 h-36"
            />
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800">
              {data?.sub_heading}
            </h3>
            <div
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></div>
            
          </div>
        </div>
      </div>
    );
};

export default BlogDetail;
