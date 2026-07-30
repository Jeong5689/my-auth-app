'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMsg(error.message)
    else {
      setMsg('가입 완료! 이메일 인증 링크를 확인하세요.')
      setTimeout(() => router.push('/login'), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSignup} className="w-80 space-y-4 p-6 border rounded">
        <h1 className="text-2xl font-bold">회원가입</h1>
        <input type="email" placeholder="이메일" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded" required />
        <input type="password" placeholder="비밀번호 (6자 이상)" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded" required minLength={6} />
        <button className="w-full bg-black text-white p-2 rounded">가입하기</button>
        {msg && <p className="text-sm">{msg}</p>}
        <a href="/login" className="block text-sm text-blue-600">이미 회원이신가요? 로그인</a>
      </form>
    </div>
  )
}
