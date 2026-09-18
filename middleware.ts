import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Without Supabase there is no auth backend, so the admin area is unavailable.
  if (!supabaseUrl || !supabaseKey) {
    const url = request.nextUrl.clone();
    url.pathname = "/Components_Login";
    return NextResponse.redirect(url);
  }

  // This gets replaced below if Supabase needs to write updated session cookies.
  let supabaseResponse = NextResponse.next({ request });

  // Create a Supabase client wired to the edge request/response cookies.
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      // Read the session token from the incoming request cookies
      getAll() {
        return request.cookies.getAll();
      },
      // Write any refreshed session tokens to both the request and the response
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Validate the session JWT with Supabase's servers on every request.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in and trying to reach the admin area -> send to login.
  if (!user && request.nextUrl.pathname.startsWith("/components_Admin")) {
    const url = request.nextUrl.clone();
    url.pathname = "/Components_Login";
    return NextResponse.redirect(url);
  }
  return supabaseResponse;
}

// Only run middleware on /components_Admin routes
export const config = {
  matcher: ["/components_Admin/:path*"],
};
