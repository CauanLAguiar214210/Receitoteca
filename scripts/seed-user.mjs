import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'http://127.0.0.1:54321',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
)

async function seedUser() {
  const { data: existing } = await supabase.auth.admin.listUsers()
  const found = existing?.users?.find((u) => u.email === 'teste@email.com')

  if (found) {
    console.log('Usuário já existe:', found.email)
    return
  }

  const { data, error } = await supabase.auth.admin.createUser({
    id: '00000000-0000-0000-0000-000000000001',
    email: 'teste@email.com',
    password: '123456',
    email_confirm: true,
  })

  if (error) {
    console.error('Erro ao criar usuário:', error.message)
    return
  }

  console.log('Usuário criado:', data.user?.email)
}

seedUser()
