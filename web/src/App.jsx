import { Room } from './components'
import styles from './App.module.css'
import { useState } from 'react'

function App() {
  const [userId, setUserId] = useState('')
  return (
    <>
      用户 ID&nbsp;
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <div className={styles.roomWrapper}>
        <Room
          id="1"
          userId={userId}
        />
        <Room
          id="2"
          userId={userId}
        />
        <Room
          id="3"
          userId={userId}
        />
      </div>
    </>
  )
}

export default App
