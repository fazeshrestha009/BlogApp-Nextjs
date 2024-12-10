import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />  
      <main className="flex-1">{children}</main>
      <Footer /> 
    </div>
  );
};
 
export default HomeLayout;
