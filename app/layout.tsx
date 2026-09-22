import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/cart/CartProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
export const metadata: Metadata = { title: { default: 'Cee2Sweet | Premium Hair, Sierra Leone', template: '%s | Cee2Sweet' }, description:'Premium hair, wigs, bundles and beauty essentials for Sierra Leone.', openGraph:{ type:'website', siteName:'Cee2Sweet', title:'Cee2Sweet' } };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><CartProvider><Navbar/><main>{children}</main><Footer/></CartProvider></body></html> }
