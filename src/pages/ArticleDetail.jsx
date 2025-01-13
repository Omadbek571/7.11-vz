import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateArticle } from '../store/articleSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function ArticleDetail() {
  const { id } = useParams();
  const articles = useSelector((state) => state.article.articles);
  const article = articles.find((item) => item.id === Number(id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  if (!article) {
    return <div>Malumot yo'q</div>;
  }

  const handleUpdate = () => {
    dispatch(updateArticle({ id: article.id, newTitle }));
    setModalOpen(false);

    toast.success("Yangilandi malumot!!!");
  };

  function handleArtCard() {
    navigate("/");
  }

  return (
    <div>
      <ToastContainer />

      <div className='flex justify-between'>
        <h2 onClick={handleArtCard} className='font-bold p-2 text-xl cursor-pointer'>ARTICLECARD</h2>
        <h2 className='font-bold p-2 text-2xl'>ARTICLEDETAILES</h2>
      </div>

      <div className="p-4 border-4 rounded-md">
        <h2 className="text-2xl font-bold text-gray-800">{article.title}</h2>
        <p className="text-gray-700 mt-4">{article.content}</p>

        <button
          onClick={() => setModalOpen(true)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Ozgartirish
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Ozgartirish Sozdi</h3>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Yangisini yozing"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="py-2 px-4 bg-gray-300 rounded-md"
                >
                  No
                </button>
                <button
                  onClick={handleUpdate}
                  className="py-2 px-4 bg-blue-500 text-white rounded-md"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleDetail;
