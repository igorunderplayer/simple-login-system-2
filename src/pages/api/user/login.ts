import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method  != 'POST') {
    res.status(404).end()
    return
  }

  const { email, password } = req.body as { email: string, password: string }

  if (
    !email || email.trim() == '' ||
    !password || password.trim() == ''
  ) {
    res.status(400).send('Invalid email or password')
    return
  }

  try {
    const result = await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        books: true
      },
    })
  
    if (!result) {
      res.status(400).send('User not found')
      return
    }
  
    const match = await bcrypt.compare(password, result.password)
  
    if (!match) {
      res.status(401).send('Invalid password')
      return
    }

    const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET)
  
    res.status(200).json({
      token,
      user: {
        id: result.id,
        name: result.name,
        email: result.email,
        books: result.books
      }
    })

  } catch (err) {
    console.log(err)
    res.status(500).send('Internal server error')
  }
}