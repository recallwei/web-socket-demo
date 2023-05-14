/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react'
import styles from './Room.module.css'

function Room(props) {
  const [socket, setSocket] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [messageList, setMessageList] = useState([])

  const currentMessageList = useRef([])

  useEffect(() => {
    window.addEventListener('beforeunload', () => closeConnection())
    return () => {
      window.removeEventListener('beforeunload', () => closeConnection())
      closeConnection()
    }
  }, [])

  const createConnection = () => {
    if (!socket) {
      const socket = new WebSocket('ws://localhost:3333/' + props.id)
      setSocket(socket)
      socket.addEventListener('open', (e) => {
        console.log(e)
        console.log('连接已建立')
      })
      socket.addEventListener('message', (e) => {
        console.log(e)
        currentMessageList.current.push(JSON.parse(e.data).msg.toString())
        setMessageList(currentMessageList.current)
      })
    } else {
      console.log('连接已建立')
      return
    }
  }

  const closeConnection = () => {
    if (socket) {
      socket.close()
      setSocket(null)
      console.log('连接已关闭')
      alert('连接已关闭')
    } else {
      alert('当前无连接')
    }
  }

  const sendMessage = () => {
    if (socket) {
      if (!inputValue || !props.userId) {
        alert('请输入内容和用户')
        return
      }
      socket.send(
        JSON.stringify({
          roomId: props.id,
          userId: props.userId,
          msg: inputValue
        })
      )
      setInputValue('')
    } else {
      alert('当前无连接')
    }
  }

  return (
    <div className={styles.room}>
      <div>房间号：{props.id}</div>
      <div onClick={() => createConnection()}>建立连接</div>
      <div onClick={() => closeConnection()}>关闭连接</div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <span
        style={{ marginLeft: '4px' }}
        onClick={() => sendMessage()}
      >
        发送
      </span>
      {messageList.map((message) => (
        <div key={Math.random() + message}>{message}</div>
      ))}
    </div>
  )
}

export default Room
