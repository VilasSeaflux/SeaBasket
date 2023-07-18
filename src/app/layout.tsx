// import NavBar from '../Components/NavBar'
import Footer from '@/Components/footer/Footer';
import NavBar from '@/Components/navbar/NavBar';
import { SessionProvider } from 'next-auth/react'
import RTKProvider from '@/Redux/Provider';
import 'bootstrap/dist/css/bootstrap.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })



export const metadata = {
  title: 'SeaBasket',
  description: 'Welcome to SeaBasket a oneStop destination for all your groceries.',
}



export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode,
  session: any,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <RTKProvider>
            <NavBar />
            {children}
            <Footer />
          </RTKProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
