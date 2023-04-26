import { prismaClient } from "../lib/prismaClient";

export async function getUsers() {
  const users = await prismaClient.user.findMany();

  return users;
}
