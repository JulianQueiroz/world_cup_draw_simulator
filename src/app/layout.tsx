import { AppThemeProvider } from '@/context/themeProvider';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className='bg-gray-50'>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}