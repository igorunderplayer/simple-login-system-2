import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import prisma from '../../../prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      if (!req.headers.token) {
        res.status(401).send('No token provided')
        return
      }

      try {
        const decoded = jwt.verify(
          req.headers.token as string,
          process.env.JWT_SECRET
        ) as jwt.JwtPayload

        const user = await prisma.user.findUnique({
          where: {
            id: decoded.id
          },
          select: {
            id: true,
            name: true,
            email: true,
            books: true
          }
        })

        res.status(200).json(user)
      } catch (err) {
        res.status(401).send('Invalid token')
      }
    }

    case 'PATCH': {
      const { name } = req.body as { name: string }
      if (!name || name.trim() == '') {
        res.status(400).send('Invalid name')
        return
      }

      if (name.length > 32) {
        res.status(400).send('Name is too long')
        return
      }

      const { token } = req.headers as { token: string }

      if (!token) {
        res.status(401).send('No token provided')
        return
      }

      try {
        const decoded = jwt.verify(
          token as string,
          process.env.JWT_SECRET
        ) as jwt.JwtPayload

        await prisma.user.update({
          where: {
            id: decoded.id
          },
          data: {
            name
          }
        })

        res.status(200).send('User updated')
      } catch (err) {
        res.status(401).send('Invalid token')
      }
    }
    default: {
      res.status(404).end()
    }
  }
}