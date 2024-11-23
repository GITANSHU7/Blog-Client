/* eslint-disable react/prop-types */
import axios from "axios";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { modalTheme } from "../theme/modalTheme";
import { useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getAllPostData, updatePost } from "../redux/postSlice";

function EditPost({
  isOpen,
  onClose,
  handleCreateClick,
  postToEdit,
  setPostToEdit,
  reloadData,
}) {
  // const [createModalOpen, setCreateModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  //   const [postToEdit, setPostToEdit] = useState(null)

  const editThePost = async () => {
    if (!postToEdit) return;
    const formData = new FormData();
    formData.append("title", postToEdit?.title);
    formData.append("description", postToEdit?.description);
    formData.append("author", postToEdit?.author);
    formData.append("sub_heading", postToEdit?.sub_heading);
    if (postToEdit.image) {
      formData.append("image", postToEdit.image);
    }
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/post/update/${postToEdit._id}`,
        formData
      );
      dispatch(updatePost(postToEdit));

      // handleCreateClick();
      onClose();
      reloadData()
      setPostToEdit(null);
    } catch (error) {
      console.error(error.message || "Error updating user");
      toast.error(error.response?.data?.message || "Error updating user");
    }
  };

  // const editBook = async () => {
  //   if (!postToEdit) return;
  //   const formData = new FormData();
  //   formData.append("title", postToEdit?.title);
  //   formData.append("description", postToEdit?.description);
  //   formData.append("author", postToEdit?.author);
  //   formData.append("sub_heading", postToEdit?.sub_heading);
  //   if (postToEdit.image) {
  //     formData.append("image", postToEdit.image);
  //   }
  //   try {
  //     const store = JSON.parse(localStorage.getItem("userData") || "{}");
  //     const apiToken = store?.data?.token;

  //     if (!apiToken) {
  //       throw new Error("Missing authorization token");
  //     }

  //     await axios.put(
  //       `${import.meta.env.VITE_BACKEND_URL}/post/update/${postToEdit._id}`,
  //       formData,

  //     );
  //     await bookDetails();
  //     toast.success("Book updated successfully");
  //     setEditModalOpen(false);
  //     setBookToEdit(null);
  //   } catch (error) {
  //     console.error(error.message || "Error updating book");
  //     toast.error(error.response?.data?.message || "Error updating user");

  //   }
  // };

  const UploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then((file) => {
            data.append("file", file);

            // Replace with your backend API URL
            fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
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

  return (
    <>
      <Modal
        theme={modalTheme}
        position={"center"}
        show={isOpen}
        size="md"
        onClose={onClose}
        popup
      >
        <Modal.Header className="justify-center">Edit Post</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="flex flex-col gap-4">
              <div className="flex justify-center items-center mt-4">
                {postToEdit?.imageUrl && (
                  <img
                    src={
                      typeof postToEdit.image === "object"
                        ? URL.createObjectURL(postToEdit.image)
                        : `${import.meta.env.VITE_BACKEND_URL}/${
                            postToEdit.imageUrl
                          }`
                    }
                    alt="Preview"
                    className="h-32 w-32 object-cover"
                  />
                )}
              </div>

              <div>
                <input
                  id="newImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setPostToEdit({
                      ...postToEdit,
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
                  value={postToEdit?.title || ""}
                  onChange={(e) =>
                    setPostToEdit({
                      ...postToEdit,
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
                  value={postToEdit?.sub_heading || ""}
                  onChange={(e) =>
                    setPostToEdit({
                      ...postToEdit,
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
                  className="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-focused h-44 "
                  onReady={handleEditorReady}
                  data={postToEdit?.description || ""}
                  height="200px"
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
                  //       "imageUpload", // Ensure the image upload button is in the toolbar
                  //       "blockQuote",
                  //       "undo",
                  //       "redo",
                  //     ],
                  //   }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setPostToEdit({ ...postToEdit, description: data });
                  }}
                />
              </div>
              {/* <div>
                <Label htmlFor="newDescription" value="Description" />
                <TextInput
                  id="newDescription"
                  type="text"
                  value={postToEdit.description || ""}
                  onChange={(e) =>
                    setPostToEdit({
                      ...postToEdit,
                      description: e.target.value,
                    })
                  }
                />
              </div> */}
              <div>
                <Label htmlFor="newAuthor" value="Author Name" />
                <TextInput
                  id="newAuthor"
                  type="text"
                  value={postToEdit?.author || ""}
                  onChange={(e) =>
                    setPostToEdit({
                      ...postToEdit,
                      author: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <Button color="success" onClick={editThePost}>
                Save
              </Button>
              <Button color="gray" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditPost;
