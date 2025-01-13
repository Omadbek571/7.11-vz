import React, { useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ArticleCard from '../pages/ArticleCard';
import CreateArticle from '../pages/CreateArticle';
import Comment from '../pages/Comment';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ArticleDetail from '../pages/ArticleDetail';

function Navbar() {

    const navigate = useNavigate()

    function PrivateRoute({ children }) {
        const token = localStorage.getItem("token")

        useEffect(() => {
            if (!token) {
                navigate("/login", {
                    replace: true
                })
            }
        }, [token, navigate])


        return children
    }


    return (
        <div>
            <nav className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">BLOG</h1>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="hover:text-yellow-300">ArticleCard</Link>
                        </li>
                        <li>
                            <Link to="/createart" className="hover:text-yellow-300">Create Article</Link>
                        </li>
                        <li>
                            <Link to="/comments" className="hover:text-yellow-300">Comments</Link>
                        </li>
                        <li>
                            <Link to="/register" className="hover:text-yellow-300">Register</Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-yellow-300">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container mx-auto mt-8">
                <Routes>
                    <Route path="/" element={<PrivateRoute><ArticleCard /></PrivateRoute>} />
                    <Route path="/createart" element={<PrivateRoute><CreateArticle /></PrivateRoute>} />
                    <Route path="/details/:id" element={<PrivateRoute><ArticleDetail /></PrivateRoute>} />
                    <Route path="/comments" element={<PrivateRoute><Comment /></PrivateRoute>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>

            </div>
        </div>
    );
}

export default Navbar;
