import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    const nameRef = useRef()
    const passwordRef = useRef()

    const navigate = useNavigate()

    const [user, setUser] = useState([])


    function handleLogin(e) {
        e.preventDefault()

        let userInfo = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        }

        setUser(prev => [...prev, userInfo])

        axios.post("https://auth-rg69.onrender.com/api/auth/signin", userInfo, {
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => {
                if (res.data.accessToken) {
                    localStorage.setItem("token", res.data.accessToken)
                    navigate("/")
                }
            })
            .catch((err) => {
                if (err.message === "Request failed with status code 404") {
                    alert("Sizning Loginizda hatolik mavjud!!!")
                    navigate("/register")
                }

                console.log(err);
            })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <input
                            ref={nameRef}
                            type="text"
                            placeholder="Enter username..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="Enter password..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
