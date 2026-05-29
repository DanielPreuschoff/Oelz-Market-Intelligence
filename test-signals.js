import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function run() {
  const { data: editions } = await supabase.from('editions').select('*, edition_signals(count)')
  console.log("Editions:", editions)
  
  const { data: signals } = await supabase.from('signals').select('id, status, edition_signals(count)')
  const statusCounts = signals.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1
    return acc
  }, {})
  console.log("Signal Status counts:", statusCounts)
}
run()
