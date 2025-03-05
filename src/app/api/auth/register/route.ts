import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
	try {
		const data = await request.json();

		const checkTheUsername = await prisma.user.findFirst({
			where: {
				username: data.username,
			},
		});

		const checkTheEmail = await prisma.user.findFirst({
			where: {
				email: data.email,
			},
		});

		if (checkTheUsername) {
			return NextResponse.json({
				message: "Username already in use!",
				status: 400,
			});
		}

		if (checkTheEmail) {
			return NextResponse.json({ message: "Email already in use!", status: 400 });
		}

		const hashedPassword = await bcrypt.hash(data.password, 10);

		await prisma.user.create({
			data: {
				username: data.username,
				email: data.email,
				password: hashedPassword,
			},
		});

		return NextResponse.json({ status: 200 });
	} catch {
		return NextResponse.json({ status: 404 });
	}
}
