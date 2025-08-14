import './App.css'
import Header from "./layout/Header/Header.tsx";
import Home from "./pages/Home/Home.tsx";
import {LanguageProvider} from "./context/LanguageProvider.tsx";
import Career from "./pages/Career/Career.tsx";
import Cases from "./pages/Cases/Cases.tsx";
import Socials from "./pages/Socials/Socials.tsx";

function App() {
  return (
    <LanguageProvider>
      <Header/>
      <Home/>
      <Career/>
      <Cases/>
      <Socials />
    </LanguageProvider>
  );
}

export default App
