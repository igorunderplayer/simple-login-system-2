import React from 'react'

import styles from './styles.module.css'

interface IProps {
  title: string
  description: string
}

const Book: React.FC<IProps> = ({ title, description }) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Book
