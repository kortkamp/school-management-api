enum Segments {
  infantil = 'Infantil',
  pre_escola = 'Pre escola',
  fundamental = 'Ensino Fundamental',
  medio = 'Ensino Médio',
}

interface IGrade {
  id: string;

  name: string;

  segment: Segments;

  created_at: Date;

  updated_at: Date;
}

export { IGrade, Segments };
