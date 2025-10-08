'use client'
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";

// Validation Schema
const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
    .matches(/[a-z]/, 'Lowercase letter is required')
    .matches(/[A-Z]/, 'Uppercase letter is required')
    .matches(/[0-9]/, 'Number is required')
    .matches(/\W/, 'Special character is required')
    .min(6, 'Minimum 6 characters are required'),
});

// Formik Setup
const Signin = () => {
  const signinForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    
    // Send data to backend API
    validationSchema: SigninSchema,
    onSubmit: (values, { resetForm }) => {
      axios.post('http://localhost:5000/user/authenticate', values)
        .then((result) => {
          toast.success('Login successful');
          localStorage.setItem("token", result.data.token); // save token
          resetForm();
        })
        .catch((error) => {
          console.error(error);
          toast.error('Invalid email or password');
        });
    }
  });


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-neutral-950">
      <div className="w-full max-w-md mt-7 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Don't have an account?{" "}
              <a
                className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"
                href="/create-account"
              >
                Sign up here
              </a>
            </p>
          </div>

          <div className="mt-5">
            {/* Google Sign In */}
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center cursor-pointer items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              {/* Google Icon */}
              <svg className="w-4 h-auto" width={46} height={47} viewBox="0 0 46 47" fill="none">
                <path d="M46 24.0287C46 22.09 ..." fill="#4285F4" />
              </svg>
              Sign in with Google
            </button>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
              Or
            </div>

            {/* Form */}
            <form onSubmit={signinForm.handleSubmit}>
              <div className="grid gap-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm mb-2 dark:text-white">Email address</label>
                  <input
                   type="email"
                   name="email"
                   placeholder="Enter your email"
                   value={signinForm.values.email}
                   onChange={signinForm.handleChange}
                   onBlur={signinForm.handleBlur}
                   className="py-2.5 sm:py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                 />

                
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm mb-2 dark:text-white">Password</label>
                
                  <input
                   type="password"
                   name="password"
                   placeholder="Enter your password"
                   value={signinForm.values.password}
                   onChange={signinForm.handleChange}
                   onBlur={signinForm.handleBlur}
                   className="py-2.5 sm:py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                  />
                  {signinForm.touched.password && signinForm.errors.password && (
                    <p className="text-red-500 text-sm">{signinForm.errors.password}</p>
                  )}

                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700" />
                    <label className="ms-2 text-sm dark:text-white">Remember me</label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-500">
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex cursor-pointer justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;