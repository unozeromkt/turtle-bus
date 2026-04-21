// NextAuth configuration - deprecated, using Supabase Auth instead
// This file is kept for reference only

export const authConfig = {}
            console.log('Password does not match')
            return null
          }

          // Update last login
          await supabaseAdmin
            .from('users')
            .update({ last_login: new Date().toISOString() })
            .eq('id', user.id)

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
            role: user.role,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role as string
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const isAdmin = request.nextUrl.pathname.startsWith('/admin')

      if (isAdmin && !isLoggedIn) {
        return false
      }

      return true
    },
  },
}
