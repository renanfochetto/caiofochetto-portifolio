export interface Link {
  id: string;
  label: string;
}

export type CaseData = {
  case: string;
  id: number;
  nome: string;
  empresa: string;
  src: string;
  ano: number;
  tags: string[];
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
  tags: Record<string, Tag>;
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
