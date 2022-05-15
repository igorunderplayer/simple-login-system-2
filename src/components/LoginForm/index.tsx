import { NextPage } from 'next'
import React, {useState} from 'react'

import styles from './styles.module.css'

interface IProps {
  onSubmit: (email: string, password: string) => void
}

const LoginForm: React.FC<IProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>

        <h2>Faça login com suas informações</h2>
        <div className={styles.inputs}>
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
        </div>
        
        <button type="submit">Login</button>

      </form>
  )
}

export default LoginForm
