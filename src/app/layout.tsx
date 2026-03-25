import { ThemeProviderContext } from "@/context/themeProvider";
import "./globals.css"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProviderContext>
          {children}
        </ThemeProviderContext>
      </body>
    </html>
  )
}