import React, { useEffect, useState } from "react";
import {
  Button,
  Label,
  Modal,
  Pagination,
  Table,
  TextInput,
} from "flowbite-react";
import { useDispatch } from "react-redux";
import axios from "axios";
import PostCard from "../conponents/PostCard";

const PostList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [bookIdToDelete, setBookIdToDelete] = useState(null);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getAllPost = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/post`,
        null,
        
      );
      setLoading(false);
      setData(response?.data?.data);
    //   dispatch(getAllPost(response.data));
    } catch (error) {
      console.error(error.message || "Error fetching book details");
      throw error;
    }
  };

  useEffect(() => {
    getAllPost();
  },[]);
  return (
    <>
    <div className="flex flex-wrap justify-center gap-6 p-6 bg-gradient-to-r from-blue-200 to-purple-200">
            {data.map((blog, index) => (
                <PostCard key={index} {...blog} />
            ))}
        </div>
    </>
  )
};

export default PostList;
