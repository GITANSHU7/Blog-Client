/* eslint-disable react/prop-types */
import axios from "axios";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { modalTheme } from "../theme/modalTheme";
import { useDispatch } from "react-redux";
import { createPost } from "../redux/postSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function AddPost({ isOpen, onClose, handleCreateClick, reloadData }) {
  // const [createModalOpen, setCreateModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    image: "",
    author: "",
    sub_heading: "",
  });

  const isSaveDisabled = 
  !newPost.title || 
  !newPost.description || 
  !newPost.author || 
  !newPost.sub_heading;

  const createNewPost = async () => {
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("description", newPost.description);
    formData.append("author", newPost.author);
    formData.append("sub_heading", newPost.sub_heading);
    if (newPost.image) {
      formData.append("image", newPost.image);
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/post/create`,
        formData
      );
      dispatch(createPost(response.data));
      toast.success("Book created successfully");
      // setCreateModalOpen(false);
      handleCreateClick();
      reloadData();
      onClose();
      setNewPost({
        title: "",
        description: "",
        image: "",
        author: "",
        sub_heading: "",
      });
      console.log(newPost);
    } catch (error) {
      console.error(error.message || "Error creating post");
      toast.error(error.response?.data?.message || "Error creating post");
      console.log(error.response?.data?.message);
    }
  };

    const UploadAdapter = (loader) => {
      return {
        upload: () => {
          return new Promise((resolve, reject) => {
            const data = new FormData();
            loader.file.then((file) => {
              data.append("file", file);

              // Replace with your backend API URL
              fetch("http://localhost:8000/upload", {
                method: "POST",
                body: data,
              })
                .then((response) => response.json())
                .then((result) => {
                  resolve({
                    default: result.url, // URL of the uploaded image
                  });
                })
                .catch((error) => {
                  reject(error);
                });
            });
          });
        },
      };
    };

    const handleEditorReady = (editor) => {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return UploadAdapter(loader);
      };
    };

    const closeButton = () => {
      onClose();
      setNewPost({
        title: "",
        description: "",
        image: "",
        sub_heading: "",
        author: "",
      });
    }

  return (
    <>
      {/* <Modal
        theme={modalTheme}
        position={"center"}
        show={createModalOpen}
        size="md"
        onClose={onClose}
        popup
      > */}
      <Modal
        theme={modalTheme}
        position={"center"}
        show={isOpen}
        size="md"
        onClose={closeButton}
        popup
      >
        <Modal.Header className="justify-center">Create Post</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="flex flex-col gap-4">
              <div>
                {/* Image preview */}
                {newPost.image && (
                  <div className="flex justify-center items-center mt-4">
                    <img
                      src={URL.createObjectURL(newPost.image)}
                      alt="Preview"
                      className="h-32 w-32 object-cover"
                    />
                  </div>
                )}
                <input
                  id="newImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      image: e.target.files[0],
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="newTite" value="Title" />
                <TextInput
                  id="newTitle"
                  type="text"
                  value={newPost.title || ""}
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="newHeading" value="Sub Heading" />
                <TextInput
                  id="newHeading"
                  type="text"
                  value={newPost.sub_heading || ""}
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      sub_heading: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="newDescription" value="Description" />
                {/* CKEditor integration */}
                <CKEditor
                  editor={ClassicEditor}
                  className='dark:bg-gray-800'
                 style={{height: "400px"}}
                  onReady={handleEditorReady}
                  data={newPost.description || ""}
                 
                  config={{
                    
                    height: 400, 
                    
                    
                    fontColor: {
                      colors: [
                        {
                          color: "red",
                          label: "Red",
                        },
                      ],
                    },
                  }}
                  //   config={{
                  //     toolbar: [
                  //       "heading",
                  //       "|",
                  //       "bold",
                  //       "italic",
                  //       "link",
                  //       "bulletedList",
                  //       "numberedList",
                  //       "|",
                  //       "imageUpload", 
                  //       "blockQuote",
                  //       "undo",
                  //       "redo",
                  //     ],
                  //   }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setNewPost({ ...newPost, description: data });
                  }}
                />
              </div>
             
              <div>
                <Label htmlFor="newAuthor" value="Author Name" />
                <TextInput
                  id="newAuthor"
                  type="text"
                  value={newPost.author || ""}
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      author: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <Button color="success" onClick={createNewPost} disabled={isSaveDisabled}>
                Save
              </Button>
              <Button color="gray" onClick={closeButton}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddPost;
