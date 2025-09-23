import prisma from "../../utils/prisma";
import type { UserInputSchema } from "./user.type";

export async function createUser(input: UserInputSchema) {
	const {email, password} = input;
	const user = await prisma.user.create({
		data: {
			email, password
		}
	});

	return user;
}

export async function getUser(input: UserInputSchema) {
  const { email } = input;
  
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
	return user;
}