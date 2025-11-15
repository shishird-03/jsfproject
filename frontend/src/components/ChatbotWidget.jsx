import React, { useState } from 'react'
import { ask } from '../services/chatService'

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    setMessages([...messages, userMsg])
    const res = await ask(input)
    setMessages(prev => [...prev, userMsg, { role: 'bot', text: res.answer }])
    setInput('')
  }

  return (
    <div className="fixed bottom-4 right-4">
      {open ? (
        <div className="bg-white shadow-lg rounded-lg w-80 p-3 border">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">🌱 PlantCareBot</h4>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>
          <div className="h-64 overflow-y-auto border rounded p-2 mb-2 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`my-1 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`${m.role === 'user' ? 'bg-green-200' : 'bg-gray-200'} inline-block px-2 py-1 rounded`}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded px-2 py-1"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about plants..."
            />
            <button className="bg-green-600 text-white px-3 rounded" onClick={handleSend}>Send</button>
          </div>
        </div>
      ) : (
        <button className="bg-green-700 text-white p-3 rounded-full" onClick={() => setOpen(true)}>
          💬
        </button>
      )}
    </div>
  )
}