
// import NavBar from '../Components/NavBar'
import Footer from '@/Components/footer/Footer';
import NavBar from '@/Components/navbar/NavBar';
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
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" >
      <head>
        <title>SeaBasket</title>
      </head>
      <body className={inter.className}>
        <RTKProvider>
          <NavBar />
          {children}
          <Footer />
        </RTKProvider>
      </body>
    </html>
  )
}
