import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function run() {
  const { data: editions, error: edErr } = await supabase.from('editions').select('*, edition_signals(count)')
  if (edErr) console.error("Editions Error:", edErr)
  console.log("Editions:", JSON.stringify(editions, null, 2))
  
  const { data: signals, error: sigErr } = await supabase.from('signals').select('id, status, edition_signals(count)')
  if (sigErr) console.error("Signals Error:", sigErr)
  
  if (signals) {
    const statusCounts = signals.reduce((acc, s) => {
      acc[s.status] = (acc[s.status] || 0) + 1
      return acc
    }, {})
    console.log("Signal Status counts:", statusCounts)
    console.log("Signals total:", signals.length)
  }
}
run()
