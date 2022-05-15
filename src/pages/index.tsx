import { Router, useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if(!user) {
      router.push('/login')
    }
  }, [router, user])

  if (!user) {
    return (
      <>Loading.....</>
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    router.push('/')
  }

  return (
    <div className={styles.container}>
      <h1>Home</h1>

      <div className={styles.aboutUser}>
        <h2>Suas informações:</h2>

        <div className={styles.userInformations}>
          <p>ID: {user.id}</p>
          <p>Nome: {user.name}</p>
          <p>About: {user.about}</p>
          <p>Email: {user.email}</p>
          <p>Perfil publico: { user.public ? 'Sim' : 'Nao' }</p>
          <p>Livros: { user.books.length } livros</p>
        </div>

        <div>
          <button
            className={styles.booksButton}
            onClick={() => router.push('/books')}
            >
              Clique aqui para ver seus livros
          </button>

          <button
            className={styles.logoutButton}
            onClick={handleLogout}
            >
              Sair
          </button>
        </div>
      </div>
    </div>
  )
}
