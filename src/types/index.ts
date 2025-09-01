export interface Link {
    id: string;
    label: string;
}

export type CaseData = {
    id: number;
    nome: string;
    marca: string;
    alt: string;
    folder: string;
    logos: string[];
    capa: string;
    empresa: string;
    cargo: string;
    tags: string[];
    ano: number;
    blocks: CaseBlock[];
};

export type CaseBlock =
    | {
          type: 'text' | 'quote';
          title: string;
          paragraph: string[];
      }
    | {
          type: 'photoGallery';
          layout: string;
          alt: string;
          files: string[];
          description?: string;
      }
    | {
          type: 'videoGallery';
          layout: string;
          links: string[];
          description?: string;
      };

export interface Inicial {
    pagina: string;
    titulo: string[];
    subtitulo: string[];
    links: Link[];
}

export interface BadgeLabels {
    periodo: string;
    total: string;
    atividades: string;
    competencias: string;
}

export interface Experiencia {
    empresa: string;
    logo: string;
    corFundo: string;
    corTexto: string;
    cargo: string;
    periodo: string;
    total: string;
    atividades: string;
    competencias: string;
}

export interface Carreira {
    pagina: string;
    badge: BadgeLabels;
    experiencias: Experiencia[];
}

export interface Tag {
    label: string;
    color: string;
}

export interface Cases {
    pagina: string;
    projetos: CaseData[];
    tags: Record<string, Tag>;
    modalFooter?: {
        case: string;
        company: string;
        role: string;
        year: string;
    };
}

export interface Socials {
    pagina: string;
    items: SocialItem[]
}

export interface SocialItem {
  id: string;
  name: string;
  href: string;
  icon: string;
  alt: string;
  preview: {
    desktop: string;
    mobile: string;
  };
}

export interface Footer {
    autor: string;
}

export interface LocalizedContent {
    pageTitle: string;
    inicial: Inicial;
    carreira: Carreira;
    cases: Cases;
    socials: Socials;
    footer: Footer;
    accessibility: Accessibility;
}

export interface Accessibility {
  root: string;
  botaoFechar: string;
  experiencia: string;
  abrirCase: string;
  socialsLink: string;
  inicio: string;
  carreira: string;
  cases: string;
  filter: string;
  author: string;
  nav: string;
  socials: string;
  videoSingular: string;
  videoPlural: string;
  imagenSingular: string;
  imagemPlural: string;
}
