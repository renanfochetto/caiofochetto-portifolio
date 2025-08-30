export interface Link {
    id: string;
    label: string;
}

export type CaseData = {
    id: number;
    nome: string;
    marca: string;
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
    linkedin: string;
    youtube: string;
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
}
