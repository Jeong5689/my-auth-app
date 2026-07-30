'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMsg(error.message)
    else router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-80 space-y-4 p-6 border rounded">
        <h1 className="text-2xl font-bold">로그인</h1>
        <input type="email" placeholder="이메일" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded" required />
        <input type="password" placeholder="비밀번호" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded" required />
        <button className="w-full bg-black text-white p-2 rounded">로그인</button>
        {msg && <p className="text-sm text-red-600">{msg}</p>}
        <a href="/signup" className="block text-sm text-blue-600">계정이 없으신가요? 가입</a>
      </form>
    </div>
  )
}
