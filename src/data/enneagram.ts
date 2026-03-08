import { Type, GameStrategy } from './types';

export const enneagramData: Type[] = [
  {
    id: 1,
    name: "The Reformer",
    center: "Gut",
    synthesis: "Principled, purposeful, self-controlled, and perfectionistic. Synthesized from Riso/Hudson (emphasis on integrity), Palmer (emphasis on inner critic), and Chestnut (emphasis on correctness).",
    coreDesire: "To be good, to have integrity, to be balanced.",
    coreFear: "Of being corrupt/evil, defective.",
    gamingStyle: {
      role: "Precision Support / Shotcaller",
      strengths: "Excellent at executing complex mechanics perfectly. Diligent about macro-play and timing.",
      weaknesses: "Can tilt easily when teammates make 'stupid' mistakes. May become rigid in strategy.",
      advantage: "Use your perfectionism to master high-skill floor champions. Lead by example with perfect rotations."
    },
    intel: {
      tiltFactor: "Teammates ignoring established strategy or making sloppy mechanical errors.",
      teamSynergy: "Works best with Type 6 (Loyalists) who follow the plan and Type 3 (Achievers) who execute effectively.",
      growthPath: "Learn to accept that 'good enough' is sometimes optimal in fast-paced games. Focus on what you can control.",
      stressResponse: "Becomes overly critical, micromanaging teammates' every move and losing sight of the big picture.",
      winCondition: "A perfectly executed team strategy where everyone plays their role with discipline.",
      stats: { mechanics: 85, strategy: 95, comms: 90, mental: 70, adaptability: 60, clutchFactor: 75, mapAwareness: 92, resourceEfficiency: 98, tiltResistance: 65 }
    }
  },
  {
    id: 2,
    name: "The Helper",
    center: "Heart",
    synthesis: "Demonstrative, generous, people-pleasing, and possessive. Synthesized from Riso/Hudson (need to be needed), Palmer (pride in giving), and Chestnut (emotional adaptability).",
    coreDesire: "To feel loved.",
    coreFear: "Of being unwanted, unworthy of love.",
    gamingStyle: {
      role: "Hard Support / Healer",
      strengths: "Exceptional map awareness regarding teammate health/status. Selfless peeling.",
      weaknesses: "May sacrifice their own farm/life unnecessarily to save a bad teammate. Can get resentful if help isn't acknowledged.",
      advantage: "Play enchanters or utility tanks. Your natural instinct to track ally needs makes you the ultimate force multiplier."
    },
    intel: {
      tiltFactor: "Teammates being ungrateful or toxic despite your efforts to save them.",
      teamSynergy: "Synergizes with Type 8 (Challengers) who protect them and Type 3 (Achievers) who they can enable to carry.",
      growthPath: "Learn to prioritize your own survival and resources when it's strategically necessary. You can't help if you're dead.",
      stressResponse: "Becomes intrusive and demanding of attention, potentially over-extending to 'force' a save that isn't there.",
      winCondition: "Keeping the star player alive through impossible odds to win the final teamfight.",
      stats: { mechanics: 70, strategy: 80, comms: 95, mental: 85, adaptability: 75, clutchFactor: 80, mapAwareness: 88, resourceEfficiency: 70, tiltResistance: 90 }
    }
  },
  {
    id: 3,
    name: "The Achiever",
    center: "Heart",
    synthesis: "Adaptive, excelling, driven, and image-conscious. Synthesized from Riso/Hudson (success orientation), Palmer (chameleon nature), and Chestnut (vanity/prestige).",
    coreDesire: "To feel valuable and admired.",
    coreFear: "Of being worthless.",
    gamingStyle: {
      role: "Hyper-Carry / Fragger",
      strengths: "High mechanical skill, driven to climb ranked ladders. Adaptable to meta changes.",
      weaknesses: "Can be a 'KDA player' (caring more about stats than winning). Prone to burnout.",
      advantage: "Focus on meta-defining carries. Your drive to be the best makes you excellent at mastering the strongest tools in the current patch."
    },
    intel: {
      tiltFactor: "Falling behind in stats or being outplayed in a 1v1 duel.",
      teamSynergy: "Pairs well with Type 2 (Helpers) for enabling and Type 1 (Reformers) for structured play.",
      growthPath: "Focus on the 'invisible' wins—map pressure, objective control—rather than just the scoreboard.",
      stressResponse: "Becomes hyper-competitive and potentially toxic, blaming others to preserve their own image of competence.",
      winCondition: "Topping the damage charts and being the clear MVP of the match.",
      stats: { mechanics: 95, strategy: 75, comms: 80, mental: 65, adaptability: 90, clutchFactor: 98, mapAwareness: 70, resourceEfficiency: 85, tiltResistance: 55 }
    }
  },
  {
    id: 4,
    name: "The Individualist",
    center: "Heart",
    synthesis: "Expressive, dramatic, self-absorbed, and temperamental. Synthesized from Riso/Hudson (search for self), Palmer (longing), and Chestnut (suffering/depth).",
    coreDesire: "To find themselves and their significance.",
    coreFear: "Of being without identity or personal significance.",
    gamingStyle: {
      role: "Off-Meta Specialist / One-Trick",
      strengths: "Creative pathing and build theories. Masters niche characters no one knows how to counter.",
      weaknesses: "Refuses to play 'boring' meta picks. Mood affects performance heavily.",
      advantage: "Embrace the 'One-Trick' lifestyle. Your unique playstyle confuses enemies who are used to standard meta gameplay."
    },
    intel: {
      tiltFactor: "Being forced into a 'standard' role or having their unique build criticized.",
      teamSynergy: "Works with Type 5 (Investigators) who appreciate their unique insights and Type 9 (Peacemakers) who let them be themselves.",
      growthPath: "Understand that sometimes the 'boring' play is the winning play. Don't let your mood dictate your mechanical consistency.",
      stressResponse: "Withdraws emotionally, potentially 'soft-throwing' by playing too passively or ignoring team calls.",
      winCondition: "Winning a game using a strategy or character that everyone else said was 'trash'.",
      stats: { mechanics: 88, strategy: 85, comms: 60, mental: 55, adaptability: 70, clutchFactor: 92, mapAwareness: 75, resourceEfficiency: 80, tiltResistance: 45 }
    }
  },
  {
    id: 5,
    name: "The Investigator",
    center: "Head",
    synthesis: "Perceptive, innovative, secretive, and isolated. Synthesized from Riso/Hudson (need to know), Palmer (detachment), and Chestnut (avarice of time/energy).",
    coreDesire: "To be capable and competent.",
    coreFear: "Of being useless, helpless, or incapable.",
    gamingStyle: {
      role: "Lurker / Strategist / Jungler",
      strengths: "Deep knowledge of game mechanics and hidden interactions. Calm under pressure.",
      weaknesses: "Analysis paralysis. May farm/lurk too long instead of joining team fights.",
      advantage: "Play macro-heavy roles. Your ability to track enemy cooldowns and jungle timers mentally is your superpower."
    },
    intel: {
      tiltFactor: "Chaotic team environments where information is withheld or comms are cluttered.",
      teamSynergy: "Synergizes with Type 8 (Challengers) who provide the pressure they need to work and Type 6 (Loyalists) for shared intel.",
      growthPath: "Practice 'good enough' decision making. Sometimes a fast, imperfect play is better than a perfect play that comes too late.",
      stressResponse: "Becomes detached and cynical, retreating into solo-play and ignoring the team's immediate needs.",
      winCondition: "Out-thinking the opponent through superior macro and knowledge of hidden mechanics.",
      stats: { mechanics: 80, strategy: 98, comms: 70, mental: 90, adaptability: 75, clutchFactor: 70, mapAwareness: 98, resourceEfficiency: 95, tiltResistance: 95 }
    }
  },
  {
    id: 6,
    name: "The Loyalist",
    center: "Head",
    synthesis: "Engaging, responsible, anxious, and suspicious. Synthesized from Riso/Hudson (security seeking), Palmer (worst-case scenario thinking), and Chestnut (fear/courage).",
    coreDesire: "To have security, support, and guidance.",
    coreFear: "Of being without support or guidance.",
    gamingStyle: {
      role: "Anchor / Defensive Tank",
      strengths: "Always checks bushes/corners. Excellent at predicting enemy ambushes. Loyal to the team plan.",
      weaknesses: "Hesitant to initiate without backup. Can be overly cautious.",
      advantage: "Play peel-oriented tanks or control mages. Your paranoia is a gift—you sense ganks before they happen. Communicate threats to your team."
    },
    intel: {
      tiltFactor: "Unpredictable teammates or a lack of clear leadership/plan.",
      teamSynergy: "Works best with Type 8 (Challengers) for strong leadership and Type 1 (Reformers) for clear rules.",
      growthPath: "Learn to trust your own instincts more. You don't always need consensus to make a game-winning play.",
      stressResponse: "Becomes hyper-vigilant and anxious, potentially flooding comms with every possible negative outcome.",
      winCondition: "A stable, controlled game where the team sticks together and executes a safe plan.",
      stats: { mechanics: 75, strategy: 85, comms: 92, mental: 80, adaptability: 65, clutchFactor: 65, mapAwareness: 95, resourceEfficiency: 88, tiltResistance: 85 }
    }
  },
  {
    id: 7,
    name: "The Enthusiast",
    center: "Head",
    synthesis: "Spontaneous, versatile, distractible, and scattered. Synthesized from Riso/Hudson (need for stimulation), Palmer (planning/options), and Chestnut (gluttony for experience).",
    coreDesire: "To be satisfied and content—to have their needs fulfilled.",
    coreFear: "Of being deprived and in pain.",
    gamingStyle: {
      role: "Roamer / Aggro Entry",
      strengths: "Unpredictable movement. High APM (Actions Per Minute). Great at finding new angles.",
      weaknesses: "Overextends constantly. Gets bored holding angles/farming.",
      advantage: "Play high-mobility roamers. Your chaotic energy disrupts organized enemy teams. Keep moving, keep them guessing."
    },
    intel: {
      tiltFactor: "Boring, slow-paced games or being forced to play a static, defensive role.",
      teamSynergy: "Pairs well with Type 9 (Peacemakers) who follow their lead and Type 3 (Achievers) who can keep up with the pace.",
      growthPath: "Practice patience. The most fun play isn't always the winning play. Learn to value the 'boring' parts of the game.",
      stressResponse: "Becomes scattered and impulsive, taking unnecessary risks just to 'make something happen'.",
      winCondition: "A fast-paced, high-kill game where they are constantly in the middle of the action.",
      stats: { mechanics: 92, strategy: 70, comms: 85, mental: 60, adaptability: 98, clutchFactor: 85, mapAwareness: 80, resourceEfficiency: 65, tiltResistance: 70 }
    }
  },
  {
    id: 8,
    name: "The Challenger",
    center: "Gut",
    synthesis: "Self-confident, decisive, willful, and confrontational. Synthesized from Riso/Hudson (need for control), Palmer (lust/intensity), and Chestnut (justice/power).",
    coreDesire: "To protect themselves (to be in control of their own life and destiny).",
    coreFear: "Of being harmed or controlled by others.",
    gamingStyle: {
      role: "Main Tank / IGL (In-Game Leader)",
      strengths: "Fearless initiation. Natural shot-calling ability. Mental fortitude.",
      weaknesses: "Can rage at passive teammates. May engage 1v5 thinking they can win.",
      advantage: "Take the lead. Your decisiveness wins games in solo queue where hesitation is fatal. Play engage champions who dictate the pace."
    },
    intel: {
      tiltFactor: "Passive teammates who refuse to follow their lead or 'soft' playstyles.",
      teamSynergy: "Synergizes with Type 6 (Loyalists) who follow their lead and Type 2 (Helpers) who keep them alive.",
      growthPath: "Learn to lead with empathy. Not everyone has your mental fortitude; sometimes encouragement works better than a command.",
      stressResponse: "Becomes aggressive and domineering, potentially alienating teammates and forcing bad fights.",
      winCondition: "Dominating the map through sheer aggression and forced engagements.",
      stats: { mechanics: 88, strategy: 85, comms: 98, mental: 95, adaptability: 80, clutchFactor: 95, mapAwareness: 85, resourceEfficiency: 75, tiltResistance: 98 }
    }
  },
  {
    id: 9,
    name: "The Peacemaker",
    center: "Gut",
    synthesis: "Receptive, reassuring, agreeable, and complacent. Synthesized from Riso/Hudson (need for peace), Palmer (narcotization/merging), and Chestnut (sloth/adaptation).",
    coreDesire: "To have inner stability and peace of mind.",
    coreFear: "Of conflict and fragmentation.",
    gamingStyle: {
      role: "Fill / Utility / Flex",
      strengths: "Keeps team morale high. Highly adaptable to what the team needs. Doesn't tilt.",
      weaknesses: "Passive; may wait for others to make plays. Struggles to close out games aggressively.",
      advantage: "The ultimate 'Fill' player. Your ability to merge with the team's needs makes you the glue that holds a chaotic solo queue roster together."
    },
    intel: {
      tiltFactor: "High-conflict team environments or toxic teammates fighting each other.",
      teamSynergy: "Works with everyone, but especially Type 7 (Enthusiasts) who bring the energy and Type 8 (Challengers) who provide the direction.",
      growthPath: "Practice being more assertive. Your opinion on the game state matters; don't just go with the flow if you see a mistake.",
      stressResponse: "Becomes passive-aggressive or completely disengaged, 'autopiloting' the game without real impact.",
      winCondition: "A harmonious team environment where everyone is playing their best and the win comes naturally.",
      stats: { mechanics: 78, strategy: 82, comms: 88, mental: 98, adaptability: 92, clutchFactor: 60, mapAwareness: 85, resourceEfficiency: 82, tiltResistance: 99 }
    }
  }
];

export const gameStrategies: GameStrategy[] = [
  {
    id: "valorant",
    game: "Valorant",
    genre: "Tactical Shooter",
    thumbnail: "https://picsum.photos/seed/cyberpunk/800/450",
    description: "5v5 character-based tactical shooter where precise gunplay meets unique agent abilities.",
    advice: [
      { typeId: 1, tip: "Perfect crosshair placement routines. Play Sentinel to control the site perfectly." },
      { typeId: 5, tip: "Learn every lineup. Play Controller/Smokes to manipulate the battlefield from safety." },
      { typeId: 7, tip: "Play Duelist. Your unpredictability is your best asset on entry." },
      { typeId: 8, tip: "IGL (In-Game Leader). Call the strats. Play Initiator to force fights." }
    ]
  },
  {
    id: "cs2",
    game: "Counter-Strike 2",
    genre: "Tactical Shooter",
    thumbnail: "https://picsum.photos/seed/military/800/450",
    description: "The premier tactical shooter. Pure mechanical skill and strategic depth.",
    advice: [
      { typeId: 1, tip: "Master the spray patterns. Your discipline is your greatest weapon." },
      { typeId: 6, tip: "Play Anchor. Your vigilance ensures the site is never taken for free." },
      { typeId: 3, tip: "AWPer. The star role suits your desire to be the MVP." },
      { typeId: 9, tip: "Support/Utility. Set up your teammates for success with perfect flashes." }
    ]
  },
  {
    id: "league",
    game: "League of Legends",
    genre: "MOBA",
    thumbnail: "https://picsum.photos/seed/fantasy/800/450",
    description: "Fast-paced, competitive online game blending RTS speed with RPG elements.",
    advice: [
      { typeId: 2, tip: "Support main. Focus on vision control to protect your carries." },
      { typeId: 3, tip: "Mid/Carry. Focus on high-agency champions that can 1v9." },
      { typeId: 6, tip: "Jungle/Tank. Track the enemy jungler religiously to protect your lanes." },
      { typeId: 9, tip: "Top lane tank. Absorb pressure, farm safely, and be the reliable frontline in teamfights." }
    ]
  },
  {
    id: "dota2",
    game: "Dota 2",
    genre: "MOBA",
    thumbnail: "https://picsum.photos/seed/magic/800/450",
    description: "Deepest multi-player action RTS. Infinite complexity and strategy.",
    advice: [
      { typeId: 5, tip: "Drafter/Captain. Your knowledge of the meta wins games before they start." },
      { typeId: 8, tip: "Pos 1 Carry. Demand resources and carry the late game." },
      { typeId: 4, tip: "Pos 4 Roamer. Creative pathing and unique hero picks disrupt the enemy." },
      { typeId: 1, tip: "Pos 5 Hard Support. Perfect stacking and warding discipline." }
    ]
  },
  {
    id: "overwatch",
    game: "Overwatch 2",
    genre: "Hero Shooter",
    thumbnail: "https://picsum.photos/seed/robot/800/450",
    description: "Team-based action game featuring a diverse cast of powerful heroes.",
    advice: [
      { typeId: 4, tip: "Play high-skill, unique heroes like Genji or Doomfist where expression is key." },
      { typeId: 1, tip: "Hitscan DPS. Mechanical purity and positioning are rewarded." },
      { typeId: 8, tip: "Main Tank. Create space by sheer force of will." },
      { typeId: 2, tip: "Mercy/Lifeweaver. Direct enabling of teammates." }
    ]
  },
  {
    id: "apex",
    game: "Apex Legends",
    genre: "Battle Royale",
    thumbnail: "https://picsum.photos/seed/scifi/800/450",
    description: "Strategic battle royale where character abilities define the flow of combat.",
    advice: [
      { typeId: 7, tip: "Play Octane/Pathfinder. Speed and verticality match your need for stimulation." },
      { typeId: 6, tip: "Wattson/Caustic. Secure the perimeter and keep the squad safe." },
      { typeId: 3, tip: "Wraith/Horizon. Be the fragger everyone watches on the kill feed." },
      { typeId: 8, tip: "Gibraltar. Control the engagement and protect your team." }
    ]
  },
  {
    id: "wow",
    game: "World of Warcraft",
    genre: "MMORPG",
    thumbnail: "https://picsum.photos/seed/dragon/800/450",
    description: "Massive multiplayer world focused on raids, dungeons, and PvP.",
    advice: [
      { typeId: 1, tip: "Raid Leader. Your perfectionism ensures mechanics are executed flawlessly." },
      { typeId: 2, tip: "Healer. The raid survives because of your attentiveness." },
      { typeId: 5, tip: "Theorycrafter. You know the exact stat weights for every patch." },
      { typeId: 4, tip: "Roleplayer. Immerse yourself in the lore and character identity." }
    ]
  },
  {
    id: "chess",
    game: "Chess",
    genre: "Strategy",
    thumbnail: "https://picsum.photos/seed/strategy/800/450",
    description: "The ultimate test of strategy and foresight.",
    advice: [
      { typeId: 5, tip: "Study opening theory deeply. Knowledge is your edge." },
      { typeId: 6, tip: "Prophylaxis. Always ask 'what is my opponent threatening?'" },
      { typeId: 3, tip: "Play sharp, tactical lines. Calculate deeper to win." },
      { typeId: 1, tip: "Endgame mastery. Perfect technique converts small advantages." }
    ]
  }
];
