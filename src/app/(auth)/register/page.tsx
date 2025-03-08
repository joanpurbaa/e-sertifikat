"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CircleAlert, CopyrightIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { RegisterSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<boolean>(false);
	const route = useRouter();

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
		const response = await fetch("http://localhost:3000/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		});

		const data = await response.json();

		if (data.status != 200) {
			setErrorMessage(data.message);
		} else {
			setErrorMessage(false);
			route.push("/login");
		}
	};

	return (
		<div className="h-full flex flex-col justify-between">
			<div>
				<h1 className="text-7xl font-black">Sign up</h1>
				<p className="mt-4 text-2xl">Welcome! let&apos;s get deeper</p>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-8">
						{errorMessage && (
							<div className="flex justify-center items-center border border-red-600 bg-red-400 text-white rounded-md p-3">
								<div className="flex items-center gap-x-2">
									<CircleAlert />
									<p>{errorMessage}</p>
								</div>
							</div>
						)}
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg">Username</FormLabel>
									<FormControl>
										<Input
											className="py-6 border border-input bg-transparent px-3 shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
											placeholder="Enter your username"
											type="text"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-base" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg">Email</FormLabel>
									<FormControl>
										<Input
											className="py-6 border border-input bg-transparent px-3 shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
											placeholder="Enter your email"
											type="email"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-base" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg">Password</FormLabel>
									<div className="flex items-center rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
										<FormControl>
											<Input
												type={showPassword ? "text" : "password"}
												className="flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:outline-none"
												placeholder="Enter your password"
												{...field}
											/>
										</FormControl>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="ml-2 focus:outline-none">
											{showPassword ? (
												<EyeIcon
													className="h-5 w-5 text-gray-500 hover:text-gray-700"
													aria-hidden="true"
												/>
											) : (
												<EyeOffIcon
													className="h-5 w-5 text-gray-500 hover:text-gray-700"
													aria-hidden="true"
												/>
											)}
										</button>
									</div>
									<FormMessage className="text-base" />
								</FormItem>
							)}
						/>
						<Button variant="default" size="default" className="w-full" type="submit">
							Submit
						</Button>
						<p>
							Already have an account?{" "}
							<Link href="/login" className="text-blue-500 underline">
								Login
							</Link>
						</p>
					</form>
				</Form>
			</div>
			<footer className="flex items-center gap-x-1">
				<CopyrightIcon className="w-5 h-5" />
				<p>Joan Orlando Purba | e Certificate</p>
			</footer>
		</div>
	);
}
