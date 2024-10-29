import { headers } from "next/headers";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
