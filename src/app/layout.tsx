"use client"
import { Suspense } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistedStore } from '@/Redux/store';
import RTKProvider from '@/Redux/Provider';
import Loading from './loading';
import Footer from '@/Components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '@/Components/navbar/NavBar';

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
      <body>
        <PersistGate persistor={persistedStore}>
          <RTKProvider>
            <Suspense fallback={<Loading />}>
              <NavBar />
              {children}
              <Footer />
            </Suspense>
          </RTKProvider>
        </PersistGate>
      </body>
    </html>
  )
}
