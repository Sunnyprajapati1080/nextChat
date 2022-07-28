import React, { useState } from 'react'
import io from 'socket.io-client'
import { FiSend } from 'react-icons/fi'

let socket = io("http://localhost:8000", { transports: ['websocket'] })

export default () => {
  const [msg, setMsg] = useState("")
  const [chats, setChats] = useState([])
  socket.on("recieve", data => {
    setChats([...chats, data])
  })
  const handleOnSend = () => {
    if(msg){
      socket.emit("send", { msg, sender: false })
      setChats([...chats, { msg, sender: true }])
      setMsg("")
    }
  }
  return (
    <>
      <div className='flex justify-center items-center w-screen h-screen'>
        <div className='break-words flex flex-col space-y-1 relative rounded-lg w-screen h-screen sm:w-[50%] sm:h-[80%] border-2'>
          <div className='p-2 overflow-auto flex space-y-2 flex-col h-full'>
            {chats.map((chat, index) => {
              return <div key={index} className={`${chat.sender ? "self-end" : "self-start"} sm:max-w-[255px] max-w-[240px] w-max p-2 font-semibold rounded-lg ${chat.sender ? "bg-slate-200" : "bg-pink-400"}`}>{chat.msg}
              </div>
            })}
          </div>
          <div className='w-full flex space-x-1 p-1 bg-slate-100'>
            <input onKeyDown={(e)=>{e.key=="Enter"?handleOnSend():false}} value={msg} onChange={(e) => { setMsg(e.target.value) }} type="text" placeholder='write message here...' className='outline-none p-2 bg-slate-100 w-[95.5%]' />
            <button onClick={handleOnSend} className='bg-pink-400 transition-all flex justify-center items-center hover:bg-pink-500 p-2.5 rounded-full'><FiSend className='text-xl text-slate-800'></FiSend></button>
          </div>
        </div>
      </div>
    </>
  )
}