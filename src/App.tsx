import './App.css'
import Header from "./layout/Header/Header.tsx";
import Home from "./pages/Home/Home.tsx";
import {LanguageProvider} from "./context/LanguageProvider.tsx";
import Career from "./pages/Career/Career.tsx";

function App() {
  return (
    <LanguageProvider>
        <Header/>
        <Home/>
        <Career/>
    </LanguageProvider>
  );
}

export default App
