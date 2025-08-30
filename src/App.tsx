import './App.css';
import { Header } from './layout/Header/Header.tsx';
import Home from './pages/Home/Home.tsx';
import { LanguageProvider } from './context/LanguageProvider.tsx';
import Career from './pages/Career/Career.tsx';
import Cases from './pages/Cases/Cases.tsx';
import { Socials } from './pages/Socials/Socials.tsx';
import { Footer } from './layout/Footer/Footer.tsx';

function App() {
  return (
    <LanguageProvider>
      <div className="background-layer" />
      <Header />
      <Home />
      <Career />
      <Cases />
      <Socials />
      <Footer />
    </LanguageProvider>
  );
}

export default App;
