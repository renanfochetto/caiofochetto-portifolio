import styles from './CaseGrid.module.css';
import CaseCard from "../CaseCard/CaseCard.tsx";

const cases = [
  {
    case: 'giorgionoBrasil',
    id: 1,
    nome: "#GiorgioNoBrasil",
    empresa: "History Channel - A+E Networks",
    src: "/cases/giorgionoBrasil.jpg",
    ano: 2017,
    tags: {
      label: ['#DigitalStrategy'],
      cor: ["#00ff37"]
    },
  },
  {
    case: 'havaianas',
    id: 2,
    nome: "Havaianas + NetFlix",
    empresa: "Playground",
    src: "/cases/havaianas.png",
    ano: 2021,
    tags: {
      label: ['#DigitalContent', '#DigitalStrategy'],
      cor: ['#e30169', '#00ff37']
    }
  },
  {
    case: 'history',
    id: 3,
    nome: "ALONE / SOZINHOS",
    empresa: "Playground",
    src: "/cases/history.png",
    ano: 2021,
    tags: {
      label: ['#DigitalContent', '#DigitalStrategy'],
      cor: ['#e30169', '#00ff37']
    }
  },
  {
    case: 'natura',
    id: 4,
    nome: "Natura",
    empresa: "Playground",
    src: "/cases/natura.png",
    ano: 2021,
    tags: {
      label: ['#Branding', "#DigitalContent"],
      cor: ['#3fffff', '#e30169']
    }
  },
  {
    case: 'p4jz',
    id: 5,
    nome: "Podcast Passion 4 Jazz",
    empresa: "Playground",
    src: "/cases/p4jz.png",
    ano: 2021,
    tags: {
      label: ['#GraphicDesign'],
      cor: ['#ff7d20']
    }
  },
  {
    case: 'playground',
    id: 6,
    nome: "Branded Content",
    empresa: "Playground",
    src: "/cases/playground.png",
    ano: 2020,
    tags: {
      label: ['#Branding'],
      cor: ['#3fffff']
    }
  }
]

const CaseGrid = () => {
  return (
    <div className={styles.caseGrid}>
      {cases.map(cases => (
      <CaseCard
        image={cases.src}
        key={cases.id}
        alt={`Imagem do Case ${cases.nome}`}
        projeto={cases.nome}
        tags={cases.tags}
      />
      ))}
    </div>
  )
}

export default CaseGrid;
