import prisma from "../../utils/prisma";
import type { UserInputSchema } from "./user.schema";

export async function createUser(input: UserInputSchema) {
	const {email, password} = input;
	const user = await prisma.user.create({
		data: {
			email, password
		}
	});

	return user;
}