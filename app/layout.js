import { Fugaz_One, Open_Sans } from 'next/font/google'
import "./globals.css";
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import Header from './Head';
import Logout from '@/components/Logout';

const fugaz = Fugaz_One ({ subsets: ['latin'], weight: ['400']})
const opensans = Open_Sans ({ subsets: ['latin'], weight: ['400']})

export const metadata = {
  title: "Broodl",
  description: "Track your daily mood every day of the year",
};

export default function RootLayout({ children }) {

  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={"/"}>
      <h1 className={'text-base sm:text-lg textGradient ' + fugaz.className}>Broodl</h1>
      </Link>
      <Logout />
    </header>
  )

  const footer = (
    <footer className=' p-4 sm:p-8 grid place-items-center '>
      <p  className={' text-indigo-400 ' + fugaz.className}>Created with &#129504;</p>
    </footer>
  )
  return (
    <html lang="en">
      <Header />
      <AuthProvider>
      <body
        className={'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-600' +
          opensans.className
        }
      >
        {header}
        {children}
        {footer}
      </body>
      </ AuthProvider>
    </html>
  );
}
