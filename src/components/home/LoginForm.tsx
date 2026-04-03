"use client";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { userIsRegistered, userNotRegistered } from "@/lib/store/slices";
import { authThunks } from "@/lib/store/thunks";
import { Header } from "@/components/layout/Header/Header";

const inputClass =
	"shadow appearance-none border border-blue-300 rounded w-full py-2 px-3 text-gray-700 leading-tight bg-blue-100 focus:outline-none focus:shadow-outline";

export function LoginForm() {
	const dispatch = useAppDispatch();
	const { isRegistered, isAuthenticated } = useAppSelector((state) => state.auth.auth);
	const { isLoading, isError } = useAppSelector((state) => state.auth);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [keepLoggedIn, setKeepLoggedIn] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (isRegistered) {
			dispatch(authThunks.loginUser({ username, email: "", password }));
		} else {
			dispatch(authThunks.createUser({ username, email, password }));
		}
	};

	if (isAuthenticated) return null;

	return (
		<div className="flex flex-col items-center">
			<Header title={isRegistered ? "Login" : "New user registration"} />

			<form
				onSubmit={handleSubmit}
				aria-label={isRegistered ? "Log in" : "Create an account"}
			>
				{!isRegistered && (
					<label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
						<input
							type="email"
							id="email"
							name="email"
							className={inputClass}
							value={email}
							placeholder="Email"
							autoComplete="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</label>
				)}

				<label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="username">
					<input
						type="text"
						id="username"
						name="username"
						className={inputClass}
						value={username}
						placeholder="Username"
						autoComplete="username"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>

				<label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
					<div className="relative">
						<EyeIcon
							className={`absolute right-1 top-1 cursor-pointer h-5 w-5 text-blue-500 hover:text-gray-400 ${showPassword ? "block" : "hidden"}`}
							onClick={() => setShowPassword(false)}
						/>
						<EyeSlashIcon
							className={`absolute right-1 top-1 cursor-pointer h-5 w-5 text-blue-500 hover:text-gray-400 ${!showPassword ? "block" : "hidden"}`}
							onClick={() => setShowPassword(true)}
						/>
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							name="password"
							className={inputClass}
							value={password}
							placeholder="Password"
							autoComplete={isRegistered ? "current-password" : "new-password"}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</label>

				<div className="mb-2">
					<label htmlFor="keep-logged-in" className="text-sm text-gray-600 cursor-pointer">
						<input
							id="keep-logged-in"
							name="keep-logged-in"
							type="checkbox"
							className="mr-2"
							checked={keepLoggedIn}
							onChange={() => setKeepLoggedIn((v) => !v)}
						/>
						Keep me logged in
					</label>
				</div>

				{isError && (
					<p role="alert" className="text-red-500 text-sm mt-2 text-center">
						{isRegistered
							? "Login failed. Check your credentials and try again."
							: "Registration failed. That username may already be taken."}
					</p>
				)}

				<button
					type="submit"
					disabled={isLoading}
					className="bg-blue-500 hover:bg-gray-400 shadow-lg text-sm text-white font-extrabold uppercase rounded-md w-full py-3 mt-4 disabled:opacity-50"
				>
					{isLoading ? "Please wait…" : isRegistered ? "Login" : "Sign Up"}
				</button>
			</form>

			<h3
				className="text-gray-400 text-sm font-bold mt-3 mb-2 cursor-pointer"
				onClick={() =>
					isRegistered ? dispatch(userNotRegistered()) : dispatch(userIsRegistered())
				}
			>
				{isRegistered
					? "Don't have an account? Register"
					: "I'm already registered, let me login!"}
			</h3>
		</div>
	);
}
