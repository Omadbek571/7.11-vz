import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addArticles } from '../store/articleSlice';
import { ToastContainer, toast } from 'react-toastify';

function CreateArticle() {
  const tasksRef = useRef();
  const dispatch = useDispatch();

  function handleAdd() {
    const newArticleTitle = tasksRef.current.value.trim();
    if (newArticleTitle) {
      dispatch(addArticles(newArticleTitle)); 
      tasksRef.current.value = ''; 
    }
     toast.success("Malumot qoshildi");
  }

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
              <ToastContainer />
        
      <input
        ref={tasksRef}
        type="text"
        placeholder="Enter article title..."
        className="w-80 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Add Article
      </button>
    </div>
  );
}

export default CreateArticle;
