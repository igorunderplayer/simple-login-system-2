import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'

import prisma from '../../../prisma'
import { Prisma } from '@prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    res.status(404).end()
    return
  }

  const { name, email, password } = req.body as { name: string, email: string, password: string }

  if (
    !name || name.trim() == '' ||
    !email || email.trim() == '' ||
    !password || password.trim() == ''
  ) {
    res.status(400).send('Invalid name or email or password')
  }

  if (name.length > 32) {
    res.status(400).send('Name is too long')
    return
  }

  const salts = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salts)

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    res.status(201).json({
      user: {
        name,
        email
      }
    })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        res.status(400).json({
          message: 'There is a unique constraint violation, a new user cannot be created with this email'
        })
      }
    }
  }
}