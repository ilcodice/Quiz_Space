import './globals.css';
import StarsBackground from '../client/src/components/background/StarsBackground';
import Navbar from '../client/src/components/custom_components/navbar';
import Footer from '../client/src/components/custom_components/footer-nav';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative">
        <StarsBackground />
        <main className="relative z-10 min-h-screen w-full">
          <Navbar />
          {children}
          
        </main>
        <Footer />
      </body>
    </html>
  );
}

