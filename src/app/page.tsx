"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();

	return (
		<>
			<h1 className="text-red-500">hello {session?.user?.name}</h1>
			<form
				action={async () => {
					await signOut();
				}}>
				<button type="submit">Sign Out</button>
			</form>
		</>
	);
}
