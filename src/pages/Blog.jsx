/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditPost from "../conponents/EditPost";
import { useDispatch } from "react-redux";
import { deletePost1, getAllPostData } from "../redux/postSlice";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal } from "flowbite-react";
import toast from "react-hot-toast";
import AddPost from "../conponents/AddPost";

function formatDateToDDMMYY(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
}

const BlogList = () => {
  const [data, setData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditClick = (blogData) => {
    setPostToEdit(blogData);
    setEditModalOpen(true);
  };
  const getAllPost = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/post`,
        null
      );
      setLoading(false);
      setData(response?.data?.data);
      dispatch(getAllPostData(response?.data?.data));
      //   dispatch(getAllPost(response.data));
    } catch (error) {
      console.error(error.message || "Error fetching book details");
      throw error;
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const reloadData = () => {
    getAllPost();
  };
  const deletePost = async () => {
    if (!postToDelete) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/post/delete/${postToDelete}`
      );
      getAllPost();
      toast.success("Post deleted successfully");
      dispatch(deletePost1(response.data));
      setDeleteModalOpen(false);
      setPostToDelete(null);
    } catch (error) {
      console.error(error.message || "Error deleting user");
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };

  // Handle delete button click
  const handleDeleteClick = (_id) => {
    setPostToDelete(_id);
    setDeleteModalOpen(true);
  };

  const BlogCard = ({
    imageUrl,
    title,
    sub_heading,
    author,
    createdAt,
    _id,
    blogData,
  }) => {
    return (
      <div className="w-80 h-96 rounded-lg shadow-lg bg-white dark:bg-gray-800 flex flex-col">
        {/* Image Section */}
        <div
          className="h-48 w-full"
          onClick={() => {
            navigate(`/blog/${_id}`);
          }}
        >
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${imageUrl}`}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg cursor-pointer"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <h3
            className="mt-2 text-lg font-bold text-gray-900 dark:text-white truncate cursor-pointer"
            onClick={() => {
              navigate(`/blog/${_id}`);
            }}
          >
            {title}
          </h3>
          <p
            className="text-sm text-gray-700 dark:text-gray-300 truncate cursor-pointer"
            onClick={() => {
              navigate(`/blog/${_id}`);
            }}
          >
            {sub_heading}
          </p>

          <div className="flex items-center mt-4">
            {/* Author Profile */}
            <img
              src={
                "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              }
              alt={author}
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => {
                handleEditClick(blogData);
              }}
            />
            <div className="ml-2">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {author}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDateToDDMMYY(createdAt)}
              </p>
            </div>

            {/* Buttons Section */}
            <div className="ml-auto flex space-x-2">
              <button
                className="bg-blue-500 text-white px-3 py-2 text-sm rounded-md hover:bg-blue-600"
                onClick={() => {
                  handleEditClick(blogData);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 text-sm rounded-md hover:bg-red-600"
                onClick={() => {
                  handleDeleteClick(_id);
                }}
              >
                <RiDeleteBin4Fill />
              </button>
            </div>
          </div>
        </div>
        {/* Delete Post Modal */}
        <Modal
          show={deleteModalOpen}
          size="md"
          onClose={() => setDeleteModalOpen(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure? You want to delete this post
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={deletePost}>
                  Yes I'm sure
                </Button>
                <Button color="gray" onClick={() => setDeleteModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  };
  return (
    <>
      <div className="flex flex-wrap justify-center gap-6  p-6 bg-gradient-to-r dark:bg-zinc-700 bg-blue-200 to-purple-200 ">
        
        {data.length === 0 && !loading && (
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-500 dark:text-gray-400" />
            <h3 className="mb-5  font-bold xl:text-2xl lg:text-xl md:text-lg sm:text-sm text-gray-500 dark:text-gray-400">
              Hey! No post found. Please add a new post!
            </h3>
          </div>
        )} 
        {data.length > 0 && (
          <>        
        {data.map((blog, index) => (
          <BlogCard key={index} {...blog} blogData={blog} />
        ))}
        </>
      )}

      </div>
      {/* <Slider /> */}
      <AddPost reloadData={reloadData} />
      <EditPost
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        setPostToEdit={setPostToEdit}
        postToEdit={postToEdit}
        reloadData={reloadData}
      />
    </>
  );
};

export default BlogList;
