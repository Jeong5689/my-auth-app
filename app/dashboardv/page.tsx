import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">환영합니다, {user.email}</h1>
      <form action="/auth/signout" method="post" className="mt-4">
        <button className="bg-red-600 text-white px-4 py-2 rounded">로그아웃</button>
      </form>
    </div>
  )
}
