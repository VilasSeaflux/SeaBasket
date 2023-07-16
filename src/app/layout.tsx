// import NavBar from '../Components/NavBar'
import NavBar from '@/Components/navbar/NavBar';
import 'bootstrap/dist/css/bootstrap.css';
// import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SeaBasket',
  description: 'Welcome to SeaBasket a oneStop destination for all your groceries.',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        </body>
    </html>
  )
}
