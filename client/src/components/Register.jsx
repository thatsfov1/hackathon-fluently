import { useRef } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import axios from "axios";


export const Register = () => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const navigate = useNavigate();
    const form = useRef();

    const handleRegister = async (data) => {
        if (form.current) {
            try {
                const result = await axios.post("http://localhost:3001/register", data);
                console.log(result);
                navigate("/login");
            } catch (err) {
                console.log(err);
                console.log(data);
                reset();
            }
        }
    };

    return (
        <div>
            <form ref={form} onSubmit={handleSubmit(handleRegister)}>
                <input type="text" {...register("fullName", {
                    required: "Your Full Name is required",
                    minLength: {
                        value: 5,
                        message: "Your Full Name is too short",
                    },
                })} name="fullName"
                    id="fullName"
                    placeholder="Your First and Last name" />
                <input {...register("email", {
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
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter your email address" />
                <input {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password is too short",
                    },
                })}
                    type={"password"}
                    name="password"
                    id="password"
                    placeholder="************" />

                <button className="signup-btn mt-5" type="submit">
                    Sign up
                </button>
            </form>

        </div>
    )
}
