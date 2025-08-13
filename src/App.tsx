import './App.css'
import Header from "./layout/Header.tsx";
import Home from "./pages/Home.tsx";
import { LanguageProvider } from "./context/LanguageProvider.tsx";

function App() {
  return (
    <LanguageProvider>
      <Header/>
      <Home />
    </LanguageProvider>
  );
}

export default App
