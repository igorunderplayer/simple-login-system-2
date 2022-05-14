import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import styles from '../styles/Books.module.css'

const Books = () => {
  const { user } = useContext(UserContext)

  if (!user) {
    return (
      <>Loading.....</>
    )
  }

  return (
    <div className={styles.container}>
      { user.books.length < 1 ? 'Vc n possui nenhum livro' : (
        <>
          <h3>Livros que você possui:</h3>
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

const Book: React.FC<IBookProps> = ({ title, description }) => {
  return (
    <div className={styles.book}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>

  )
}

export default Books