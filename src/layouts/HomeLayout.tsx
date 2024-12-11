import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />  
      <main className="flex-1">{children}</main>
      <Footer /> 
      </>
   
  );
};
 
export default HomeLayout;
