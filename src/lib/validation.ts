import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().min(1, {
		message: "You forgot to enter your email. No email, no login!",
	}),
	password: z
		.string()
		.min(6, "Your password is too short! It must be at least 6 characters."),
	// .regex(/[0-9]/, "Make it stronger! Add at least one number (0-9).")
	// .regex(/[A-Z]/, "Your password needs at least one uppercase letter (A-Z).")
	// .regex(
	// 	/[@$!%*?&]/,
	// 	"Try adding a special character (!@#$%^&*) to make it secure."
	// ),
});
