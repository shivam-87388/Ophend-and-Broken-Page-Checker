'use client'
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const CreateAccount = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
      terms: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions")
        .required("You must accept the terms and conditions"),
    }),
  onSubmit: (values) => {
  // Send form data to backend
  axios.post('http://localhost:5000/user/register', values)
    .then((response) => {
      // Backend responds successfully
      if (response.status === 201) { // account created
        toast.success("Account created successfully!");
      } else {
        // Any unexpected status
        toast.error("Error creating account");
      }
    })
    .catch((error) => {
      // If backend returns an error
      const message = error.response?.data?.message || "Error creating account";
      toast.error(message);
    });
}

  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-neutral-950">
      <div className="w-full max-w-md mt-7 mb-7 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Create an Account
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Already have an account?{" "}
              <a
                className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"
                href="/login"
              >
                Sign in here
              </a>
            </p>
          </div>

          <div className="mt-5">
            {/* Google Sign Up */}
            <button
              type="button"
              className="w-full py-3 px-4 cursor-pointer inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              {/* Google Icon */}
              <svg className="w-4 h-auto" width={46} height={47} viewBox="0 0 46 47" fill="none">
                <path d="M46 24.0287C46 22.09 ..." fill="#4285F4" />
              </svg>
              Sign up with Google
            </button>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
              Or
            </div>

            {/* Form */}
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm mb-2 dark:text-white">Name</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        {...formik.getFieldProps("firstName")}
                        className={`py-2.5 sm:py-3 px-4 border ${formik.touched.firstName && formik.errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                          } rounded-lg w-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400`}
                      />
                      {formik.touched.firstName && formik.errors.firstName && (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.firstName}</div>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        {...formik.getFieldProps("lastName")}
                        className={`py-2.5 sm:py-3 px-4 border ${formik.touched.lastName && formik.errors.lastName
                            ? "border-red-500"
                            : "border-gray-300"
                          } rounded-lg w-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400`}
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.lastName}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm mb-2 dark:text-white">Email address</label>
                  <input
                    type="email"
                    name="email"
                    {...formik.getFieldProps("email")}
                    className={`py-2.5 sm:py-3 px-4 block w-full border ${formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                      } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm mb-2 dark:text-white">Password</label>
                  <input
                    type="password"
                    name="password"
                    {...formik.getFieldProps("password")}
                    className={`py-2.5 sm:py-3 px-4 block w-full border ${formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : "border-gray-300"
                      } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400`}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm mb-2 dark:text-white">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    {...formik.getFieldProps("confirmPassword")}
                    className={`py-2.5 sm:py-3 px-4 block w-full border ${formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                      } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400`}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</div>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="terms"
                    {...formik.getFieldProps("terms")}
                    className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
                  />
                  <label className="ms-3 text-sm dark:text-white">
                    I accept the{" "}
                    <a href="#" className="text-blue-600 hover:underline font-medium dark:text-blue-500">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                {formik.touched.terms && formik.errors.terms && (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.terms}</div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 cursor-pointer text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;