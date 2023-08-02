"use client"
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense, lazy } from 'react';
import { persistedStore } from '@/Redux/store';
import RTKProvider from '@/Redux/Provider';
import Loading from './loading';
import 'bootstrap/dist/css/bootstrap.css';
import Footer from '@/Components/footer/Footer';
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
