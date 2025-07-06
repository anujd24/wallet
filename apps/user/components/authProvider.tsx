// components/auth-provider.tsx
"use client"

import { type ReactNode } from "react"
import { SessionProvider as OriginalSessionProvider } from "next-auth/react"
import type { SessionProviderProps as OriginalSessionProviderProps } from "next-auth/react"

// Force correct children typing
interface AuthProviderProps extends Omit<OriginalSessionProviderProps, 'children'> {
  children: ReactNode
}

export const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  const Provider = OriginalSessionProvider as React.ComponentType<AuthProviderProps>
  return <Provider {...props}>{children}</Provider>
}