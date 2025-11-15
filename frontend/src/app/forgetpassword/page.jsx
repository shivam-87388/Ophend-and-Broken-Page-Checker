"use client";

import React, { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("⚠️ Please enter your email address.");
      return;
    }

    // Simulate sending reset link
    setMessage(`✅ A password reset link has been sent to ${email}`);
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8 dark:bg-neutral-900 dark:border-neutral-700">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Forgot password?
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
            Remember your password?{" "}
            <a
              className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"
              href="/signin"
            >
              Sign in here
            </a>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2.5 sm:py-3 px-4 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:placeholder-neutral-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 inline-flex justify-center cursor-pointer items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Reset password
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-sm text-center text-green-600 dark:text-green-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
