import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
	try {
    const prisma = new PrismaClient();
		const data = await request.json();
    
		const checkTheUsername = await prisma.user.findFirst({
			where: {
				name: data.username,
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
				name: data.username,
				email: data.email,
				password: hashedPassword,
			},
		});
		return NextResponse.json({ status: 200 });
	} catch {
		return NextResponse.json({ status: 404 });
	}
}
