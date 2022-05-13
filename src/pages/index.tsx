import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
  }, [])

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <p>Seja bem vindo {user.name}</p>
    </div>
  )
}
