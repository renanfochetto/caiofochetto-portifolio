import './App.css';
import {LanguageProvider} from './context/LanguageProvider.tsx';
import AppContent from './layout/AppContent/AppContent.tsx';

export function App() {
  return (
    <LanguageProvider>
      <AppContent/>
    </LanguageProvider>
  );
}

export default App;
