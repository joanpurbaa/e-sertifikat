"use client"
export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="h-screen">
				<main className="grid grid-cols-12 text-zinc-800">
					<section className="h-screen col-span-4 p-20">{children}</section>
					<section className="col-span-8 bg-gradient-to-br from-blue-900 to-blue-400"></section>
				</main>
			</body>
		</html>
	);
}
