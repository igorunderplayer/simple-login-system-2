import React, { useState, createContext } from 'react'

interface IUser {
  id: string
  name: string
  email: string
  books: {
    id: string
    title: string
    description: string
    createdAt: any
    ownerId: string
    owner: IUser
  }
}

export const UserContext = createContext({} as {
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser>>
})

interface IProps {
  children?: React.ReactNode
}

export const UserProvider: React.FC<IProps> = (props) => {
  const [user, setUser] = useState<IUser>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

