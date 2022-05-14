import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import styles from '../../styles/UserInfo.module.css'

interface IUser {
  id: string
  name: string
  about: string
}

const User = () => {
  const router = useRouter()
  const [data, setData] = useState<IUser>({} as IUser)

  useEffect(() => {
    fetch('/api/user/' + router.query.id)
    .then(res => {
      if (res.status === 200) {
        res.json().then(d => setData(d))
      }
    })
  }, [router])

  if (!data) {
    return <div className={styles.container}>Loading....</div>
  }

  return (
    <div className={styles.container}>
      INFO de {data.name}
      <div className={styles.userinfoBox}>
        <div>
          <p>Nome: {data.name}</p>
          <p>About: {data.about}</p>
          <p>ID: {data.id}</p>
        </div>
      </div>
    </div>
  )
}


export default User