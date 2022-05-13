// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      books: true
    }
  })

  res.status(200).json(allUsers)
}
