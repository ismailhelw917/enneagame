export interface Type {
  id: number;
  name: string;
  center: 'Head' | 'Heart' | 'Gut';
  synthesis: string;
  coreDesire: string;
  coreFear: string;
  gamingStyle: {
    role: string;
    strengths: string;
    weaknesses: string;
    advantage: string;
  };
  intel: {
    tiltFactor: string;
    teamSynergy: string;
    growthPath: string;
    stressResponse: string;
    winCondition: string;
    stats: {
      mechanics: number;
      strategy: number;
      comms: number;
      mental: number;
      adaptability: number;
      clutchFactor: number;
      mapAwareness: number;
      resourceEfficiency: number;
      tiltResistance: number;
    };
  };
}

export interface GameStrategy {
  id: string;
  game: string;
  genre: string;
  thumbnail: string;
  description: string;
  advice: {
    typeId: number;
    tip: string;
  }[];
}
