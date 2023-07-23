"use client"
import Footer from '@/Components/footer/Footer';
import NavBar from '@/Components/navbar/NavBar';
import RTKProvider from '@/Redux/Provider';
import 'bootstrap/dist/css/bootstrap.css';
import { Inter } from 'next/font/google'
import { Suspense } from 'react';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] })


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
          <Suspense fallback={<Loading />}>
            <NavBar />
            {children}
            <Footer />
          </Suspense>
        </RTKProvider>
      </body>
    </html>
  )
}
