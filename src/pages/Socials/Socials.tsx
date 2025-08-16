import styles from './Socials.module.css';
import {useLocalizedContent} from '../../hooks/useLocalizedContent.ts';
// import Link from '../../components/Link/Link.tsx';
import {useEffect} from 'react';


// const links = [
//   {
//     name: 'LINKEDIN',
//     icon: '/icons/linkedin.svg',
//     href: 'https://www.linkedin.com/in/caiofochetto/',
//     preview: '/socials/linkedin-mobile.avif'
//   },
//   {
//     name: 'YOUTUBE',
//     icon: '/icons/youtube.svg',
//     href: 'https://www.youtube.com/@caiofochetto/playlists',
//     preview: '/socials/youtube-desktop.avif'
//   }
// ];



const Socials = () => {
  const content = useLocalizedContent();
  console.log('Conteúdo carregado:', content);

  useEffect(() => {
    console.log('Socials foi montado');
  }, []);


  if (!content) return null;

  return (
    <section id="socials">
      <div>
        <h3>Socials</h3>
      </div>
      <div style={{ background: '#eee', padding: '2rem' }}>
        <h2>Socials</h2>
        <p>Conteúdo de teste visível</p>
      </div>
    </section>
);
};

export default Socials;
