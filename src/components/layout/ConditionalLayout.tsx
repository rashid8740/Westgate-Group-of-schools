'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Check if current path is an admin route
  const isAdminRoute = pathname?.startsWith('/admin');

  // For admin routes, render only children (no Header/Footer)
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For public routes, render with Header and Footer
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
