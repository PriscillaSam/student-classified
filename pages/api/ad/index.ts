import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prismaClient } from 'api/lib/prismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getSession({ req });
  // console.log(session);
  // if (!session || !session.user) {
  //   console.log('testing');

  //   return res.status(200).send('Unauthorized');
  // }

  // const email = 'session.user.email';

  if (req.method === 'POST') {
    await prismaClient.ad.create({
      data: {
        description: req.body.description,
        priceRange: req.body.priceRange,
        title: req.body.title,
        isActive: true,
        location: req.body.location,

        // @ts-ignore
        seller: { connect: { email: req.body.email } },
        category: { connect: { id: req.body.category } },
      },
    });

    return res.status(200).json({ error: null });
  }

  if (req.method === 'GET') {
    const ads = await prismaClient.ad.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: true,
        seller: true,
      },
    });

    return res.status(200).json(ads);
  }

  return res.send('Method not allowed.');
}
