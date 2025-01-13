import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment } from '../store/articleSlice';
import { ToastContainer, toast } from 'react-toastify';


function ArticleCard() {
    const articles = useSelector((state) => state.article.articles);
    const dispatch = useDispatch();

    const [newComment, setNewComment] = useState({});
    const [showComments, setShowComments] = useState({});

    const handleCommentChange = (id, value) => {
        setNewComment((prev) => ({ ...prev, [id]: value }));
    };

    const handleAddComment = (id) => {
        if (newComment[id]?.trim()) {
            dispatch(addComment({ id, comment: newComment[id] }));
            setNewComment((prev) => ({ ...prev, [id]: '' }));
        }
        toast.success("Comment qoshildi!!!");
    };

    const toggleComments = (id) => {
        setShowComments((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="space-y-4 mt-8">
                  <ToastContainer />
            {articles.length > 0 &&
                articles.map((value) => (
                    <div
                        key={value.id}
                        className="bg-white p-4 border-4 rounded-md "
                    >
                        <h3 className="text-xl font-semibold text-gray-800">{value.title}</h3>
                        <p className="text-gray-600">{value.summary}</p>
                        <Link
                            to={`/details/${value.id}`}
                            className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded-md "
                        >
                            Details
                        </Link>

                        <div className="mt-4">
                            <input
                                type="text"
                                value={newComment[value.id] || ""}
                                onChange={(e) => handleCommentChange(value.id, e.target.value)}
                                placeholder="Enter comment..."
                                className="w-full p-2 border border-gray-300 rounded-md "
                            />
                            <button
                                onClick={() => handleAddComment(value.id)}
                                className="mt-2 bg-green-500 text-white py-1 px-4 rounded-md "
                            >
                                add coment
                            </button>
                            <button
                                onClick={() => toggleComments(value.id)}
                                className="ml-2 mt-2 bg-gray-500 text-white py-1 px-4 rounded-md "
                            >
                                {showComments[value.id] ? 'yopish' : 'ochish'}
                            </button>
                        </div>

                        {showComments[value.id] && value.comments.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <h4 className="text-lg font-semibold">Camentlariz Bro!!! {value.comments.length}-ta boldi</h4>
                                {value.comments.map((comment, idx) => (
                                    <p key={idx} className="text-gray-700">
                                        {idx + 1}--{comment}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
}

export default ArticleCard;
