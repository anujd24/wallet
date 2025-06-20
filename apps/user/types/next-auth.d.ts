import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      phone?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    phone?: string | null;
  }
}
