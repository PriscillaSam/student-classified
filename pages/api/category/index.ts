import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from 'api/lib/prismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const categories = await prismaClient.category.findMany();

    return res.status(200).json(categories);
  }

  return res.send('Method not allowed.');
}
