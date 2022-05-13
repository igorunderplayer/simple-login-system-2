import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'

const Login: React.FC = () => {
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (!!user) {
      router.push('/')
      return
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })

      if (res.status === 200) {
        const { user } = await res.json()
        console.log(user)
        setUser(user)
        router.push('/')
      }
      
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

      </form>
    </div>
  )
}

export default Login