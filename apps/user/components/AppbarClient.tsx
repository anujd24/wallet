"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Appbar } from "@repo/ui/AppBar";

export function AppbarClient() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasMounted, setHasMounted] = useState(false); // 🛡️ Prevent hydration mismatch

  useEffect(() => {
    setHasMounted(true); // ✅ ensure client-only effect

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar if scrolling up or near top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setShow(true);
      } else {
        setShow(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (!hasMounted) return null; // Prevent SSR mismatch

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Appbar
        user={session?.user}
        onSignin={signIn}
        onSignout={async () => {
          await signOut({ callbackUrl: "/" }); // ✅ Redirect to homepage after logout
        }}
      />
    </div>
  );
}
