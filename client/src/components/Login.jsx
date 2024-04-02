import { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Login = ({ onLogin, setUser }) => {
    const [loginStatus, setLoginStatus] = useState("");
    const navigate = useNavigate();
    const form = useRef()
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const handleLogin = async (data) => {
        if (form.current) {
            try {
                const result = await axios.post("http://localhost:3001/login", data);

                if (result.data === "Incorrect password" || result.data === "No records found") {
                    setLoginStatus(result.data);
                } else {
                    window.localStorage.setItem("isLoggedIn", true);
                    onLogin();
                    navigate("/");
                    reset();
                    setUser(result.data);
                }
            } catch (err) {
                console.log(err);
                reset();
            }
        }
    };

    return (
        <div>
            <form ref={form}
                onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-2'>
                {loginStatus && (
                    <div>
                        {loginStatus}
                    </div>
                )}
                {errors.email && (
                    <div>
                        {errors.email?.message}
                    </div>
                )}
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Email is incorrect",
                        },
                        minLength: {
                            value: 7,
                            message: "Email is too short",
                        },
                    })}
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                />

                {errors.password && (
                    <div>
                        {errors.password?.message}
                    </div>
                )}
                <input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password is too short",
                        },
                    })}
                    type={"password"}
                    name="password"
                    placeholder="************"
                />
                <button className="mt-5" type="submit">
                    Log in
                </button>
            </form>
        </div>
    )
}
