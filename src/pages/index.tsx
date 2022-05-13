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
  }, [router, user])

  if (!user) {
    return (
      <>Loading.....</>
    )
  }

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <p>Seja bem vindo {user.name}</p>

      <div className={styles.aboutUser}>
        <h2>Suas informações:</h2>

        <div className={styles.userInformations}>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
        </div>
        <button className={styles.logoutButton}>Sair</button>
      </div>
    </div>
  )
}
