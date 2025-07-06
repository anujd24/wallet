"use client"

import { type ReactNode } from "react"
import { RecoilRoot } from "recoil";
import { AuthProvider } from "./components/authProvider";

export const Providers = ({children}: {children: ReactNode}) => {
    return (
    <RecoilRoot>
        <AuthProvider
        refetchInterval={5 * 60}
        refetchOnWindowFocus={true}
        >
            {children}
            </AuthProvider>
        
    </RecoilRoot>
    )
}