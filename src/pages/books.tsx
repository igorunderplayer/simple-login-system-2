import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Book from '../components/Book'
import { UserContext } from '../contexts/UserContext'
import styles from '../styles/Books.module.css'

const Books: NextPage = () => {
  const router = useRouter()
  const { user } = useContext(UserContext)

  useEffect(() => {
    if(!user) {
      router.push('/login')
    }
  }, [router, user])

  if (!user) {
    return (
      <div className={styles.container}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      { user.books.length < 1 ? 'Vc n possui nenhum livro' : (
        <>
          <h1>Livros que você possui:</h1>
          <ul className={styles.books}>
            {user.books.map(book => (
              <li key={book.id}>
                <Book title={book.title} description={book.description} />
              </li>
            ))}
          </ul>
        </>
      ) }
    </div>
  )
}

interface IBookProps {
  title: string
  description: string
}


export default Books
