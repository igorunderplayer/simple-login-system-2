import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { UserContext } from '../contexts/UserContext'

import styles from '../styles/Login.module.css'

const Login: NextPage = () => {
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (!!user) {
      router.push('/')
      return
    }
  }, [router, user])

  const handleSubmit = async (email: string, password: string) => {
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
        const { token, user } = await res.json()
        localStorage.setItem('token', token)
        setUser(user)
        router.push('/')
      }
      
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Login</h1>

      <LoginForm onSubmit={handleSubmit} />
    </div>
  )
}

export default Login
