// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma'

import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const { title, description } = req.body as { title: string, description: string }

      const { token } = req.headers as { token: string }

      if (!token) {
        res.status(401).send('No token provided')
        return
      }

      if (
        !title || title.trim() == '' ||
        !description || description.trim() == ''
      ) {
        res.status(400).send('Invalid title or description')
        return
      }

      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET
        ) as jwt.JwtPayload

        const user = await prisma.user.findUnique({
          where: {
            id: decoded.id
          }
        })

        if (!user) {
          res.status(401).send('Invalid token')
          return
        }

        const book = await prisma.book.create({
          data: {
            title,
            description,
            owner: {
              connect: {
                id: user.id
              }
            }
          }
        })

        res.status(201).json(book)
      } catch(e) {}
    }
  }
}
