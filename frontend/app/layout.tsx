import './globals.css';
import { Inter } from 'next/font/google';
import { MockAuthProvider } from '@/contexts/MockAuthContext';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Auth & Assessment System',
  description: 'Complete authentication and assessment system with mock auth',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MockAuthProvider>
          <Navbar />
          <main>{children}</main>
        </MockAuthProvider>
      </body>
    </html>
  );
}