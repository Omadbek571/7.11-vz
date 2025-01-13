import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const navigate = useNavigate()


    const [dataUser, setDataUser] = useState([])

    console.log(dataUser);

    function handleRegister(e) {
        e.preventDefault()

        const user = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        setDataUser(prev => [...prev, user])

        axios.post("https://auth-rg69.onrender.com/api/auth/signup", user, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.data.message === "User registered successfully!") {
                    alert("Siz muofaqiyatli Register qildingiz!!!")
                    navigate("/login")
                }

            })
            .catch((err) => {
                if (err.message === "Request failed with status code 400") {
                    alert("Sizda hatolik mavjud")
                }
                console.log(err);

            })

    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <input
                            ref={nameRef}
                            type="text"
                            placeholder="Enter name..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Enter email..."
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
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register
