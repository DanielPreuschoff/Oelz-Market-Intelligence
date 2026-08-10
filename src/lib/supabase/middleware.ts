import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // getClaims() statt getUser(): das Projekt signiert seine Sitzungstoken mit
  // ES256 und veroeffentlicht den oeffentlichen Schluessel unter
  // /auth/v1/.well-known/jwks.json. Die Signatur laesst sich damit lokal
  // pruefen — getUser() dagegen fragt bei jedem Aufruf den Auth-Server, und
  // diese Middleware laeuft bei jeder Anfrage, auch bei den Vorablade-Anfragen
  // hinter jedem <Link>. Das war eine Netzwerkrunde pro ueberfahrenem Menuepunkt.
  //
  // Die Sitzungserneuerung bleibt erhalten: getClaims() holt den Token intern
  // ueber getSession(), und das erneuert einen abgelaufenen Token wie zuvor.
  // Der Schluessel wird modulweit zwischengespeichert (GLOBAL_JWKS), nur die
  // erste Anfrage einer kalten Instanz holt ihn.
  //
  // Bewusste Abwaegung: ein lokal geprueftes Token gilt bis zu seinem Ablauf,
  // auch nach einer Abmeldung. Fuer die Weiterleitung hier ist das unkritisch —
  // die Zugriffsrechte setzt RLS in der Datenbank durch, und das Layout prueft
  // zusaetzlich serverseitig ueber getCurrentProfile().
  const { data: claims } = await supabase.auth.getClaims()
  const user = claims?.claims ?? null

  const pathname = request.nextUrl.pathname

  // Redirect unauthenticated users to login (except on auth routes)
  if (!user && !pathname.startsWith('/login') && !pathname.startsWith('/auth')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from login
  if (user && pathname === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
