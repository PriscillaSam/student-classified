import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prismaClient } from 'api/lib/prismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  console.log(session);
  if (!session || !session.user) {
    return res.status(403).send('Unauthorized');
  }

  const email = 'session.user.email';

  if (req.method === 'POST') {
    await prismaClient.ad.create({
      data: {
        description: req.body.description,
        categoryId: req.body.category,
        priceRange: req.body.price,
        title: req.body.title,
        isActive: true,
        // @ts-ignore
        seller: { connect: { email } },
        category: { connect: { id: req.body.category } },
      },
    });

    return res.status(200).json({ error: null });
  }

  return res.send('Method not allowed.');
}
