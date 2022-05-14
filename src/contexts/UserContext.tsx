import { useRouter } from 'next/router'
import React, { useState, createContext, useEffect } from 'react'

interface IUser {
  id: string
  name: string
  about: string
  public: boolean
  email: string
  books: {
    id: string
    title: string
    description: string
    createdAt: any
    ownerId: string
    owner: IUser
  }[]
}

export const UserContext = createContext({} as {
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser>>
})

interface IProps {
  children?: React.ReactNode
}

export const UserProvider: React.FC<IProps> = (props) => {
  const router = useRouter()
  const [user, setUser] = useState<IUser>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('/api/user/me', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          token,
        }
      }).then(res => {
        if (res.status === 200) {
          res.json().then(d => setUser(d))
        }
      })
    }
  }, [router])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

