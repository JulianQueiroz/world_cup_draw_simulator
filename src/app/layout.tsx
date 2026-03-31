import { AppThemeProvider } from '@/context/themeProvider';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <AppThemeProvider>
          <div className="min-h-screen bg-gray-50 text-black dark:bg-zinc-900 dark:text-white">
            <div className="flex items-end pl-5 ">
              <img src="/L0XXaLc6tYhD.gif" className="w-12 h-12" />

              <h1 className="text-l font-semibold tracking-wide">
                World Cup Draw Simulator
              </h1>
            </div>

            {children}
          </div>
        </AppThemeProvider>
      </body>
    </html>
  );
}
