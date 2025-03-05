import { z } from "zod";

export const RegisterSchema = z.object({
	username: z.string().min(1, {
		message: "You forgot to enter your username. No username, no sign up!",
	}),
	email: z
		.string()
		.min(1, {
			message: "You forgot to enter your email. No email, no sign up!",
		})
		.email("Make sure to enter a valid email!"),
	password: z
		.string()
		.min(1, "You forgot to enter your password. No password, no sign up!")
		.min(6, "Your password is too short! At least 6 characters, okay?")
		.regex(/[0-9]/, "Make it stronger! Add at least one number (0-9)!")
		.regex(/[A-Z]/, "Your password needs at least one uppercase letter (A-Z)!")
		.regex(
			/[@$!%*?&]/,
			"Try adding a special character (!@#$%^&*) to make it secure."
		),
});

export const LoginSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: "You forgot to enter your email. No email, no login!",
		})
		.email("Make sure to enter a valid email!"),
	password: z.string(),
});
