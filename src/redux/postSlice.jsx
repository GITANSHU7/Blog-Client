import { createSlice } from '@reduxjs/toolkit';

const loadPostsFromLocalStorage = () => {
  try {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  } catch (error) {
    console.error('Failed to load posts from localStorage', error);
    return [];
  }
};

const initialState = {
  posts: loadPostsFromLocalStorage(),
  error: null
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.posts.push(action.payload);
      savePostsToLocalStorage(state.posts);
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
        savePostsToLocalStorage(state.posts);
      }
    },
    deletePost1: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload.id);
      savePostsToLocalStorage(state.posts);
    },
    viewPost: (state, action) => {
      state.currentPost = state.posts.find(post => post.id === action.payload.id);
    },
    getAllPostData: (state, action) => {
      state.posts = action.payload;

    }
  }
});


const savePostsToLocalStorage = (posts) => {
  try {
    localStorage.setItem('posts', JSON.stringify(posts));
  } catch (error) {
    console.error('Failed to save posts to localStorage', error);
  }
};

export const { createPost, updatePost,getAllPostData, deletePost1, viewPost } = postSlice.actions;

export default postSlice.reducer;
