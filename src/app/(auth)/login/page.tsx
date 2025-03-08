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
import Google from "@/components/icons/Google";
import { LoginSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { handleCredentialSignIn } from "@/src/lib/actions";

export default function Login() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
		""
	);

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		const result = await handleCredentialSignIn(values);

		setErrorMessage(result?.message)
	};

	return (
		<div className="h-full flex flex-col justify-between">
			<div>
				<h1 className="text-7xl font-black">Login</h1>
				<p className="mt-4 text-2xl">Welcome back! let&apos;s explore</p>
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
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg">Email</FormLabel>
									<FormControl>
										<Input
											className="py-6 border border-input bg-transparent px-3 shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
											placeholder="Enter your email"
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
						<div className="flex justify-between items-center">
							<div className="w-[220px] h[1px] border border-zinc-400 rounded-full"></div>
							<p>or</p>
							<div className="w-[220px] h[1px] border border-zinc-400 rounded-full"></div>
						</div>
						<a className="bg-gray-100 hover:bg-gray-200 flex justify-between items-center py-3 px-5 rounded-lg">
							<Google />
							<p>Continue with Google</p>
							<div></div>
						</a>
						<p>
							Dont&apos;t have an account?{" "}
							<Link href="/register" className="text-blue-500 underline">
								Sign up
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
