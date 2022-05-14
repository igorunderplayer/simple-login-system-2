import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || typeof id != 'string') {
    res.status(400).send('Invalid id')
    return
  }

  const user = await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      about: true,
      books: true,
      public: true
    }
  })

  if (!user || !user.public) {
    res.status(404).send('User not found')
    return
  }

  res.status(200).json(user)
}