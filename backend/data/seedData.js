export const teams = [
  {
    id: 'ind',
    name: 'India',
    shortName: 'IND',
    code: 'in',
    flag: 'https://flagcdn.com/w160/in.png',
    logo: 'https://flagcdn.com/w160/in.png',
    primaryColor: '#0055a5',
    captain: 'Rohit Sharma',
    coach: 'Gautam Gambhir',
    ranking: {
      test: { rank: 1, rating: 121, points: 3640 },
      odi: { rank: 1, rating: 118, points: 4250 },
      t20: { rank: 1, rating: 268, points: 15820 }
    }
  },
  {
    id: 'aus',
    name: 'Australia',
    shortName: 'AUS',
    code: 'au',
    flag: 'https://flagcdn.com/w160/au.png',
    logo: 'https://flagcdn.com/w160/au.png',
    primaryColor: '#00843D',
    captain: 'Pat Cummins',
    coach: 'Andrew McDonald',
    ranking: {
      test: { rank: 2, rating: 116, points: 3480 },
      odi: { rank: 2, rating: 113, points: 3960 },
      t20: { rank: 2, rating: 258, points: 14190 }
    }
  },
  {
    id: 'eng',
    name: 'England',
    shortName: 'ENG',
    code: 'gb-eng',
    flag: 'https://flagcdn.com/w160/gb-eng.png',
    logo: 'https://flagcdn.com/w160/gb-eng.png',
    primaryColor: '#002D62',
    captain: 'Ben Stokes (Test) / Jos Buttler (White-ball)',
    coach: 'Brendon McCullum',
    ranking: {
      test: { rank: 3, rating: 108, points: 3240 },
      odi: { rank: 4, rating: 102, points: 3468 },
      t20: { rank: 3, rating: 254, points: 13970 }
    }
  },
  {
    id: 'sa',
    name: 'South Africa',
    shortName: 'SA',
    code: 'za',
    flag: 'https://flagcdn.com/w160/za.png',
    logo: 'https://flagcdn.com/w160/za.png',
    primaryColor: '#007749',
    captain: 'Temba Bavuma',
    coach: 'Rob Walter',
    ranking: {
      test: { rank: 4, rating: 104, points: 2912 },
      odi: { rank: 3, rating: 106, points: 3604 },
      t20: { rank: 4, rating: 250, points: 12500 }
    }
  },
  {
    id: 'pak',
    name: 'Pakistan',
    shortName: 'PAK',
    code: 'pk',
    flag: 'https://flagcdn.com/w160/pk.png',
    logo: 'https://flagcdn.com/w160/pk.png',
    primaryColor: '#01411C',
    captain: 'Mohammad Rizwan',
    coach: 'Jason Gillespie',
    ranking: {
      test: { rank: 5, rating: 98, points: 2646 },
      odi: { rank: 5, rating: 101, points: 3131 },
      t20: { rank: 6, rating: 242, points: 11858 }
    }
  },
  {
    id: 'nz',
    name: 'New Zealand',
    shortName: 'NZ',
    code: 'nz',
    flag: 'https://flagcdn.com/w160/nz.png',
    logo: 'https://flagcdn.com/w160/nz.png',
    primaryColor: '#1a1a1a',
    captain: 'Mitchell Santner',
    coach: 'Gary Stead',
    ranking: {
      test: { rank: 6, rating: 96, points: 2496 },
      odi: { rank: 6, rating: 98, points: 2940 },
      t20: { rank: 5, rating: 246, points: 12054 }
    }
  },
  {
    id: 'afg',
    name: 'Afghanistan',
    shortName: 'AFG',
    code: 'af',
    flag: 'https://flagcdn.com/w160/af.png',
    logo: 'https://flagcdn.com/w160/af.png',
    primaryColor: '#0052cc',
    captain: 'Rashid Khan',
    coach: 'Jonathan Trott',
    ranking: {
      test: { rank: 9, rating: 68, points: 1360 },
      odi: { rank: 8, rating: 89, points: 2403 },
      t20: { rank: 7, rating: 235, points: 10810 }
    }
  },
  {
    id: 'sl',
    name: 'Sri Lanka',
    shortName: 'SL',
    code: 'lk',
    flag: 'https://flagcdn.com/w160/lk.png',
    logo: 'https://flagcdn.com/w160/lk.png',
    primaryColor: '#0038a8',
    captain: 'Charith Asalanka',
    coach: 'Sanath Jayasuriya',
    ranking: {
      test: { rank: 7, rating: 88, points: 2200 },
      odi: { rank: 7, rating: 93, points: 2697 },
      t20: { rank: 8, rating: 231, points: 10395 }
    }
  }
];

export const players = [
  {
    id: 'virat-kohli',
    name: 'Virat Kohli',
    fullName: 'Virat Kohli',
    country: 'India',
    countryCode: 'in',
    countryFlag: 'https://flagcdn.com/w160/in.png',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80',
    role: 'Batter',
    battingStyle: 'Right Handed Bat',
    bowlingStyle: 'Right-arm medium',
    jerseyNumber: 18,
    born: 'Nov 05, 1988 (Age 36)',
    age: 36,
    birthPlace: 'Delhi, India',
    bio: 'Widely recognized as one of the greatest all-format batsmen in cricket history. Kohli is the leading run-scorer in T20 World Cups and has recorded 50 ODI centuries, the most ever by any batter.',
    iccRank: { testBatting: 6, odiBatting: 3, t20Batting: 12 },
    stats: {
      test: { matches: 118, innings: 200, runs: 9040, highest: '254*', avg: 48.9, sr: 55.6, centuries: 29, fifties: 31, wickets: 0, bestBowling: '0/0', economy: 2.8 },
      odi: { matches: 295, innings: 283, runs: 13906, highest: '183', avg: 58.2, sr: 93.5, centuries: 50, fifties: 72, wickets: 5, bestBowling: '1/15', economy: 5.2 },
      t20: { matches: 125, innings: 117, runs: 4188, highest: '122*', avg: 48.7, sr: 137.0, centuries: 1, fifties: 38, wickets: 4, bestBowling: '1/13', economy: 8.1 }
    }
  },
  {
    id: 'rohit-sharma',
    name: 'Rohit Sharma',
    fullName: 'Rohit Gurunath Sharma',
    country: 'India',
    countryCode: 'in',
    countryFlag: 'https://flagcdn.com/w160/in.png',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    role: 'Batter',
    battingStyle: 'Right Handed Bat',
    bowlingStyle: 'Right-arm offbreak',
    jerseyNumber: 45,
    born: 'Apr 30, 1987 (Age 37)',
    age: 37,
    birthPlace: 'Nagpur, Maharashtra',
    bio: 'India captain and one of the cleanest strikers in modern cricket. Holder of the world record for highest ODI score (264) and 5 centuries in a single World Cup.',
    iccRank: { testBatting: 8, odiBatting: 2, t20Batting: 10 },
    stats: {
      test: { matches: 64, innings: 111, runs: 4279, highest: '212', avg: 42.4, sr: 56.4, centuries: 12, fifties: 18, wickets: 2, bestBowling: '1/26', economy: 3.1 },
      odi: { matches: 265, innings: 257, runs: 10866, highest: '264', avg: 49.2, sr: 92.4, centuries: 31, fifties: 57, wickets: 9, bestBowling: '2/27', economy: 5.1 },
      t20: { matches: 159, innings: 151, runs: 4231, highest: '121*', avg: 32.1, sr: 140.9, centuries: 5, fifties: 32, wickets: 1, bestBowling: '1/22', economy: 8.3 }
    }
  },
  {
    id: 'jasprit-bumrah',
    name: 'Jasprit Bumrah',
    fullName: 'Jasprit Jasbirsingh Bumrah',
    country: 'India',
    countryCode: 'in',
    countryFlag: 'https://flagcdn.com/w160/in.png',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    role: 'Fast Bowler',
    battingStyle: 'Right Handed Bat',
    bowlingStyle: 'Right-arm fast',
    jerseyNumber: 93,
    born: 'Dec 06, 1993 (Age 31)',
    age: 31,
    birthPlace: 'Ahmedabad, Gujarat',
    bio: 'Unorthodox action, lethal yorkers, blistering pace, and master of reverse swing. The undisputed premier all-format fast bowler in world cricket today.',
    iccRank: { testBowling: 1, odiBowling: 2, t20Bowling: 2 },
    stats: {
      test: { matches: 40, innings: 78, runs: 285, highest: '34*', avg: 7.3, sr: 42.1, centuries: 0, fifties: 0, wickets: 173, bestBowling: '6/27', economy: 2.7 },
      odi: { matches: 89, innings: 88, runs: 122, highest: '16', avg: 6.1, sr: 55.0, centuries: 0, fifties: 0, wickets: 149, bestBowling: '6/19', economy: 4.6 },
      t20: { matches: 70, innings: 69, runs: 30, highest: '7*', avg: 4.2, sr: 65.0, centuries: 0, fifties: 0, wickets: 89, bestBowling: '3/7', economy: 6.27 }
    }
  },
  {
    id: 'hardik-pandya',
    name: 'Hardik Pandya',
    fullName: 'Hardik Himanshu Pandya',
    country: 'India',
    countryCode: 'in',
    countryFlag: 'https://flagcdn.com/w160/in.png',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80',
    role: 'All-Rounder',
    battingStyle: 'Right Handed Bat',
    bowlingStyle: 'Right-arm fast-medium',
    jerseyNumber: 33,
    born: 'Oct 11, 1993 (Age 31)',
    age: 31,
    birthPlace: 'Choryasi, Gujarat',
    bio: 'Dynamic seam-bowling all-rounder who can hit colossal sixes at the death and bowl crucial middle-over spells with deceptive bouncers.',
    iccRank: { odiBatting: 45, t20Batting: 25 },
    stats: {
      test: { matches: 11, innings: 18, runs: 532, highest: '108', avg: 31.3, sr: 73.9, centuries: 1, fifties: 4, wickets: 17, bestBowling: '5/28', economy: 3.4 },
      odi: { matches: 86, innings: 61, runs: 1769, highest: '92*', avg: 34.0, sr: 110.4, centuries: 0, fifties: 11, wickets: 84, bestBowling: '4/24', economy: 5.5 },
      t20: { matches: 104, innings: 82, runs: 1641, highest: '71*', avg: 27.8, sr: 141.2, centuries: 0, fifties: 4, wickets: 87, bestBowling: '4/16', economy: 8.1 }
    }
  },
  {
    id: 'pat-cummins',
    name: 'Pat Cummins',
    fullName: 'Patrick James Cummins',
    country: 'Australia',
    countryCode: 'au',
    countryFlag: 'https://flagcdn.com/w160/au.png',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
    role: 'Fast Bowler',
    battingStyle: 'Right Handed Bat',
    bowlingStyle: 'Right-arm fast',
    jerseyNumber: 30,
    born: 'May 08, 1993 (Age 31)',
    age: 31,
    birthPlace: 'Westmead, Sydney',
    bio: 'ICC World Cup and World Test Championship winning captain. Relentless fast bowler with stamina, accuracy, and ice-cold leadership composure under pressure.',
    iccRank: { testBowling: 3, odiBowling: 8 },
    stats: {
      test: { matches: 62, innings: 117, runs: 1320, highest: '64*', avg: 16.5, sr: 45.2, centuries: 0, fifties: 3, wickets: 269, bestBowling: '6/23', economy: 2.76 },
      odi: { matches: 88, innings: 58, runs: 472, highest: '36', avg: 12.4, sr: 74.2, centuries: 0, fifties: 0, wickets: 141, bestBowling: '5/70', economy: 5.2 },
      t20: { matches: 52, innings: 23, runs: 152, highest: '28', avg: 10.1, sr: 128.8, centuries: 0, fifties: 0, wickets: 66, bestBowling: '3/15', economy: 7.4 }
    }
  },
  {
    id: 'travis-head',
    name: 'Travis Head',
    fullName: 'Travis Michael Head',
    country: 'Australia',
    countryCode: 'au',
    countryFlag: 'https://flagcdn.com/w160/au.png',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
    role: 'Batter',
    battingStyle: 'Left Handed Bat',
    bowlingStyle: 'Right-arm offbreak',
    jerseyNumber: 62,
    born: 'Dec 29, 1993 (Age 31)',
    age: 31,
    birthPlace: 'Adelaide, South Australia',
    bio: 'The ultimate big-match match-winner. Century in WTC Final 2023, century in ODI World Cup Final 2023, and known for ferocious power hitting in the powerplay overs.',
    iccRank: { testBatting: 10, odiBatting: 9, t20Batting: 1 },
    stats: {
      test: { matches: 49, innings: 81, runs: 3173, highest: '175', avg: 41.8, sr: 64.8, centuries: 7, fifties: 16, wickets: 14, bestBowling: '4/10', economy: 3.5 },
      odi: { matches: 65, innings: 62, runs: 2603, highest: '154*', avg: 44.1, sr: 106.8, centuries: 6, fifties: 16, wickets: 18, bestBowling: '2/22', economy: 5.6 },
      t20: { matches: 38, innings: 37, runs: 1110, highest: '91', avg: 34.7, sr: 159.2, centuries: 0, fifties: 5, wickets: 1, bestBowling: '1/12', economy: 8.8 }
    }
  },
  {
    id: 'steve-smith',
    name: 'Steve Smith',
    fullName: 'Steven Peter Devereux Smith',
    country: 'Australia',
    countryCode: 'au',
    countryFlag: 'https://flagcdn.com/w160/au.png',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80',
    role: 'Batter',
    battingStyle: 'Right Handed Bat',
    bowlingStyle: 'Right-arm legbreak',
    jerseyNumber: 49,
    born: 'Jun 02, 1989 (Age 35)',
    age: 35,
    birthPlace: 'Sydney, New South Wales',
    bio: 'Regarded as modern Test cricket’s most eccentric and prolific run-machine with an average over 56 and 32 Test centuries.',
    iccRank: { testBatting: 4, odiBatting: 15 },
    stats: {
      test: { matches: 109, innings: 195, runs: 9685, highest: '239', avg: 56.9, sr: 53.8, centuries: 32, fifties: 41, wickets: 19, bestBowling: '3/18', economy: 3.6 },
      odi: { matches: 158, innings: 142, runs: 5446, highest: '164', avg: 43.9, sr: 87.2, centuries: 12, fifties: 33, wickets: 28, bestBowling: '3/16', economy: 5.4 },
      t20: { matches: 67, innings: 55, runs: 1094, highest: '90', avg: 25.4, sr: 125.2, centuries: 0, fifties: 5, wickets: 17, bestBowling: '3/20', economy: 7.9 }
    }
  },
  {
    id: 'babar-azam',
    name: 'Babar Azam',
    fullName: 'Mohammad Babar Azam',
    country: 'Pakistan',
    countryCode: 'pk',
    countryFlag: 'https://flagcdn.com/w160/pk.png',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80',
    role: 'Batter',
    battingStyle: 'Right Handed Bat',
    bowlingStyle: 'Right-arm offbreak',
    jerseyNumber: 56,
    born: 'Oct 15, 1994 (Age 30)',
    age: 30,
    birthPlace: 'Lahore, Punjab',
    bio: 'Graceful stroke maker known for his textbook cover drive and consistent scoring record across all three formats for Pakistan.',
    iccRank: { testBatting: 11, odiBatting: 1, t20Batting: 4 },
    stats: {
      test: { matches: 55, innings: 100, runs: 3998, highest: '196', avg: 44.4, sr: 55.1, centuries: 9, fifties: 26, wickets: 2, bestBowling: '1/1', economy: 3.8 },
      odi: { matches: 117, innings: 114, runs: 5729, highest: '158', avg: 56.7, sr: 88.8, centuries: 19, fifties: 32, wickets: 0, bestBowling: '0/0', economy: 6.0 },
      t20: { matches: 123, innings: 116, runs: 4145, highest: '122', avg: 41.0, sr: 129.1, centuries: 3, fifties: 36, wickets: 0, bestBowling: '0/0', economy: 7.5 }
    }
  },
  {
    id: 'ben-stokes',
    name: 'Ben Stokes',
    fullName: 'Benjamin Andrew Stokes',
    country: 'England',
    countryCode: 'gb-eng',
    countryFlag: 'https://flagcdn.com/w160/gb-eng.png',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    role: 'All-Rounder',
    battingStyle: 'Left Handed Bat',
    bowlingStyle: 'Right-arm fast-medium',
    jerseyNumber: 55,
    born: 'Jun 04, 1991 (Age 33)',
    age: 33,
    birthPlace: 'Christchurch, New Zealand',
    bio: 'England Test captain and generational match winner. Architect of the 2019 World Cup Final and Headingley Ashes miraculous chases.',
    iccRank: { testBatting: 20 },
    stats: {
      test: { matches: 105, innings: 190, runs: 6508, highest: '258', avg: 35.8, sr: 59.2, centuries: 13, fifties: 31, wickets: 203, bestBowling: '6/22', economy: 3.3 },
      odi: { matches: 114, innings: 95, runs: 3159, highest: '182', avg: 38.9, sr: 96.4, centuries: 4, fifties: 22, wickets: 74, bestBowling: '5/61', economy: 6.0 },
      t20: { matches: 43, innings: 36, runs: 585, highest: '52*', avg: 21.7, sr: 128.0, centuries: 0, fifties: 1, wickets: 26, bestBowling: '3/26', economy: 8.4 }
    }
  },
  {
    id: 'jos-buttler',
    name: 'Jos Buttler',
    fullName: 'Joseph Charles Buttler',
    country: 'England',
    countryCode: 'gb-eng',
    countryFlag: 'https://flagcdn.com/w160/gb-eng.png',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    role: 'Wicketkeeper Batter',
    battingStyle: 'Right Handed Bat',
    bowlingStyle: 'None',
    jerseyNumber: 63,
    born: 'Sep 08, 1990 (Age 34)',
    age: 34,
    birthPlace: 'Taunton, Somerset',
    bio: 'England’s T20 World Cup winning captain, destructive 360-degree batter capable of hitting boundaries anywhere on the ground.',
    iccRank: { t20Batting: 7, odiBatting: 14 },
    stats: {
      test: { matches: 57, innings: 100, runs: 2907, highest: '152', avg: 31.9, sr: 54.2, centuries: 2, fifties: 18, wickets: 0, bestBowling: '0/0', economy: 0 },
      odi: { matches: 181, innings: 154, runs: 5022, highest: '162*', avg: 39.5, sr: 117.1, centuries: 11, fifties: 26, wickets: 0, bestBowling: '0/0', economy: 0 },
      t20: { matches: 124, innings: 114, runs: 3264, highest: '101*', avg: 35.5, sr: 146.3, centuries: 1, fifties: 24, wickets: 0, bestBowling: '0/0', economy: 0 }
    }
  },
  {
    id: 'heinrich-klaasen',
    name: 'Heinrich Klaasen',
    fullName: 'Heinrich Klaasen',
    country: 'South Africa',
    countryCode: 'za',
    countryFlag: 'https://flagcdn.com/w160/za.png',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    role: 'Wicketkeeper Batter',
    battingStyle: 'Right Handed Bat',
    bowlingStyle: 'Right-arm offbreak',
    jerseyNumber: 45,
    born: 'Jul 30, 1991 (Age 33)',
    age: 33,
    birthPlace: 'Pretoria, South Africa',
    bio: 'Widely feared as the cleanest hitter of spin bowling in the world, with superhuman striking power in the middle and death overs.',
    iccRank: { odiBatting: 8, t20Batting: 5 },
    stats: {
      test: { matches: 4, innings: 8, runs: 104, highest: '35', avg: 13.0, sr: 45.0, centuries: 0, fifties: 0, wickets: 0, bestBowling: '0/0', economy: 0 },
      odi: { matches: 54, innings: 50, runs: 1716, highest: '174', avg: 43.0, sr: 115.3, centuries: 4, fifties: 6, wickets: 0, bestBowling: '0/0', economy: 0 },
      t20: { matches: 52, innings: 47, runs: 912, highest: '69', avg: 24.0, sr: 143.6, centuries: 0, fifties: 5, wickets: 0, bestBowling: '0/0', economy: 0 }
    }
  },
  {
    id: 'rashid-khan',
    name: 'Rashid Khan',
    fullName: 'Rashid Khan Arman',
    country: 'Afghanistan',
    countryCode: 'af',
    countryFlag: 'https://flagcdn.com/w160/af.png',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
    role: 'Spin Bowler',
    battingStyle: 'Right Handed Bat',
    bowlingStyle: 'Right-arm legbreak googly',
    jerseyNumber: 19,
    born: 'Sep 20, 1998 (Age 26)',
    age: 26,
    birthPlace: 'Nangarhar, Afghanistan',
    bio: 'Global T20 sensation and Afghanistan icon. Possesses a devastating quick arm-speed googly that bamboozles world-class batters.',
    iccRank: { t20Bowling: 1, odiBowling: 4 },
    stats: {
      test: { matches: 5, innings: 9, runs: 106, highest: '51', avg: 13.2, sr: 64.0, centuries: 0, fifties: 1, wickets: 34, bestBowling: '7/137', economy: 2.9 },
      odi: { matches: 105, innings: 88, runs: 1322, highest: '60*', avg: 19.4, sr: 105.1, centuries: 0, fifties: 5, wickets: 190, bestBowling: '7/18', economy: 4.2 },
      t20: { matches: 93, innings: 53, runs: 440, highest: '48*', avg: 14.2, sr: 130.6, centuries: 0, fifties: 0, wickets: 152, bestBowling: '5/3', economy: 6.07 }
    }
  }
];

export const matches = [
  {
    _id: 'm1',
    title: 'India vs Australia, Final',
    series: 'ICC Champions Trophy 2025',
    matchFormat: 'T20',
    status: 'LIVE',
    statusNote: 'India need 14 runs in 9 balls to win',
    venue: 'Melbourne Cricket Ground, Melbourne',
    date: 'Today',
    time: 'Live Now',
    toss: 'India won the toss and elected to field',
    featured: true,
    currentInning: 2,
    battingTeam: 'teamB',
    target: 196,
    requiredRunRate: 9.33,
    currentRunRate: 9.83,
    
    teamA: {
      id: 'aus',
      name: 'Australia',
      shortName: 'AUS',
      flag: 'https://flagcdn.com/w160/au.png',
      score: '195/6',
      overs: '20.0',
      crr: 9.75,
      inningsRuns: 195,
      inningsWickets: 6,
      inningsBalls: 120
    },

    teamB: {
      id: 'ind',
      name: 'India',
      shortName: 'IND',
      flag: 'https://flagcdn.com/w160/in.png',
      score: '182/4',
      overs: '18.3',
      crr: 9.83,
      inningsRuns: 182,
      inningsWickets: 4,
      inningsBalls: 111
    },

    batsmen: [
      {
        id: 'virat-kohli',
        name: 'Virat Kohli',
        runs: 78,
        balls: 46,
        fours: 7,
        sixes: 3,
        sr: 169.57,
        outStatus: 'batting',
        isBatting: true,
        isStriker: true
      },
      {
        id: 'hardik-pandya',
        name: 'Hardik Pandya',
        runs: 24,
        balls: 11,
        fours: 2,
        sixes: 2,
        sr: 218.18,
        outStatus: 'batting',
        isBatting: true,
        isStriker: false
      }
    ],

    bowlers: [
      {
        id: 'pat-cummins',
        name: 'Pat Cummins',
        overs: 3.3,
        maidens: 0,
        runs: 36,
        wickets: 1,
        economy: 10.28,
        isBowling: true
      },
      {
        id: 'mitchell-starc',
        name: 'Mitchell Starc',
        overs: 4.0,
        maidens: 0,
        runs: 41,
        wickets: 2,
        economy: 10.25,
        isBowling: false
      }
    ],

    scorecard: {
      inning1: {
        team: 'Australia',
        total: '195/6 (20.0 Ov)',
        overs: '20.0',
        extras: '11 (w 6, nb 1, b 1, lb 3)',
        batting: [
          { id: 'travis-head', name: 'Travis Head', runs: 64, balls: 32, fours: 8, sixes: 3, sr: 200.0, outStatus: 'c Bumrah b Pandya' },
          { id: 'steve-smith', name: 'Steve Smith', runs: 42, balls: 31, fours: 4, sixes: 1, sr: 135.48, outStatus: 'b Bumrah' },
          { id: 'glenn-maxwell', name: 'Glenn Maxwell', runs: 38, balls: 19, fours: 3, sixes: 3, sr: 200.0, outStatus: 'c Rohit b Bumrah' },
          { id: 'marcus-stoinis', name: 'Marcus Stoinis', runs: 18, balls: 14, fours: 1, sixes: 1, sr: 128.57, outStatus: 'c & b Pandya' },
          { id: 'pat-cummins', name: 'Pat Cummins (c)', runs: 14, balls: 8, fours: 1, sixes: 1, sr: 175.0, outStatus: 'not out' },
          { id: 'mitchell-starc', name: 'Mitchell Starc', runs: 6, balls: 4, fours: 0, sixes: 0, sr: 150.0, outStatus: 'run out' }
        ],
        bowling: [
          { id: 'jasprit-bumrah', name: 'Jasprit Bumrah', overs: 4.0, maidens: 0, runs: 28, wickets: 2, economy: 7.0 },
          { id: 'hardik-pandya', name: 'Hardik Pandya', overs: 4.0, maidens: 0, runs: 38, wickets: 2, economy: 9.5 },
          { id: 'arshdeep-singh', name: 'Arshdeep Singh', overs: 4.0, maidens: 0, runs: 45, wickets: 1, economy: 11.25 },
          { id: 'kuldeep-yadav', name: 'Kuldeep Yadav', overs: 4.0, maidens: 0, runs: 36, wickets: 0, economy: 9.0 }
        ],
        fallOfWickets: [
          { score: '82/1', over: '7.4', player: 'Travis Head' },
          { score: '135/2', over: '13.1', player: 'Steve Smith' },
          { score: '168/3', over: '16.5', player: 'Glenn Maxwell' },
          { score: '184/4', over: '18.4', player: 'Marcus Stoinis' }
        ]
      },
      inning2: {
        team: 'India',
        total: '182/4 (18.3 Ov)',
        overs: '18.3',
        extras: '7 (w 4, nb 1, b 0, lb 2)',
        batting: [
          { id: 'rohit-sharma', name: 'Rohit Sharma (c)', runs: 47, balls: 24, fours: 5, sixes: 3, sr: 195.83, outStatus: 'c Head b Starc' },
          { id: 'shubman-gill', name: 'Shubman Gill', runs: 18, balls: 14, fours: 2, sixes: 0, sr: 128.57, outStatus: 'b Cummins' },
          { id: 'virat-kohli', name: 'Virat Kohli', runs: 78, balls: 46, fours: 7, sixes: 3, sr: 169.57, outStatus: 'not out', isBatting: true, isStriker: true },
          { id: 'suryakumar-yadav', name: 'Suryakumar Yadav', runs: 12, balls: 8, fours: 1, sixes: 1, sr: 150.0, outStatus: 'c Maxwell b Zampa' },
          { id: 'rishabh-pant', name: 'Rishabh Pant (wk)', runs: 3, balls: 5, fours: 0, sixes: 0, sr: 60.0, outStatus: 'b Starc' },
          { id: 'hardik-pandya', name: 'Hardik Pandya', runs: 24, balls: 11, fours: 2, sixes: 2, sr: 218.18, outStatus: 'not out', isBatting: true, isStriker: false }
        ],
        bowling: [
          { id: 'mitchell-starc', name: 'Mitchell Starc', overs: 4.0, maidens: 0, runs: 41, wickets: 2, economy: 10.25 },
          { id: 'pat-cummins', name: 'Pat Cummins', overs: 3.3, maidens: 0, runs: 36, wickets: 1, economy: 10.28, isBowling: true },
          { id: 'adam-zampa', name: 'Adam Zampa', overs: 4.0, maidens: 0, runs: 38, wickets: 1, economy: 9.5 },
          { id: 'josh-hazlewood', name: 'Josh Hazlewood', overs: 4.0, maidens: 0, runs: 42, wickets: 0, economy: 10.5 }
        ],
        fallOfWickets: [
          { score: '62/1', over: '5.2', player: 'Shubman Gill' },
          { score: '78/2', over: '7.1', player: 'Rohit Sharma' },
          { score: '112/3', over: '11.4', player: 'Suryakumar Yadav' },
          { score: '138/4', over: '14.2', player: 'Rishabh Pant' }
        ]
      }
    },

    commentary: [
      {
        id: 'c1',
        ball: '18.3',
        over: 19,
        runs: 6,
        tag: 'SIX',
        text: 'SIX! What a shot by Virat Kohli! Full delivery right in the slot, Kohli clears his front foot and lofts it cleanly over long-off. The MCG erupts into pure ecstasy!',
        bowler: 'Pat Cummins',
        batsman: 'Virat Kohli'
      },
      {
        id: 'c2',
        ball: '18.2',
        over: 19,
        runs: 1,
        tag: 'SINGLE',
        text: 'Back of a length, Hardik Pandya pulls it down towards deep mid-wicket for a sharp single. Brings Kohli back on strike.',
        bowler: 'Pat Cummins',
        batsman: 'Hardik Pandya'
      },
      {
        id: 'c3',
        ball: '18.1',
        over: 19,
        runs: 4,
        tag: 'FOUR',
        text: 'FOUR! Dispatched with sheer ferocity! Pandya carves the wide yorker behind point to the boundary ropes!',
        bowler: 'Pat Cummins',
        batsman: 'Hardik Pandya'
      },
      {
        id: 'c4',
        ball: '17.6',
        over: 18,
        runs: 1,
        tag: 'SINGLE',
        text: 'Speared into the toes by Starc, Kohli digs it out towards mid-on and scrambles through for a tight run. Keeps strike for the penultimate over.',
        bowler: 'Mitchell Starc',
        batsman: 'Virat Kohli'
      },
      {
        id: 'c5',
        ball: '17.5',
        over: 18,
        runs: 4,
        tag: 'FOUR',
        text: 'FOUR! Signature Virat Kohli cover drive! He leans into the flight, head right over the ball, beats the diving cover fielder and races across the lush turf.',
        bowler: 'Mitchell Starc',
        batsman: 'Virat Kohli'
      },
      {
        id: 'c6',
        ball: '17.4',
        over: 18,
        runs: 2,
        tag: 'TWO',
        text: 'Short and angled into the ribs, Kohli pulls towards deep square leg. Electric running between the wickets - two runs safely completed.',
        bowler: 'Mitchell Starc',
        batsman: 'Virat Kohli'
      }
    ]
  },
  {
    _id: 'm2',
    title: 'England vs South Africa, 3rd Test',
    series: 'South Africa tour of England 2025',
    matchFormat: 'TEST',
    status: 'LIVE',
    statusNote: 'Day 3 - Session 2: South Africa trail by 38 runs',
    venue: "Lord's Cricket Ground, London",
    date: 'Day 3',
    time: 'Live',
    toss: 'England won the toss and elected to bat',
    featured: false,
    currentInning: 3,
    battingTeam: 'teamB',
    teamA: {
      id: 'eng',
      name: 'England',
      shortName: 'ENG',
      flag: 'https://flagcdn.com/w160/gb-eng.png',
      score: '342 & 186/5',
      overs: '48.2',
      crr: 3.85
    },
    teamB: {
      id: 'sa',
      name: 'South Africa',
      shortName: 'SA',
      flag: 'https://flagcdn.com/w160/za.png',
      score: '286',
      overs: '84.4',
      crr: 3.37
    },
    batsmen: [
      { id: 'joe-root', name: 'Joe Root', runs: 74, balls: 112, fours: 9, sixes: 0, sr: 66.07, outStatus: 'batting', isBatting: true, isStriker: true },
      { id: 'ben-stokes', name: 'Ben Stokes (c)', runs: 28, balls: 40, fours: 3, sixes: 1, sr: 70.0, outStatus: 'batting', isBatting: true, isStriker: false }
    ],
    bowlers: [
      { id: 'kagiso-rabada', name: 'Kagiso Rabada', overs: 14.2, maidens: 3, runs: 52, wickets: 3, economy: 3.62, isBowling: true }
    ],
    scorecard: {
      inning1: { team: 'England', total: '342 all out (82.1 Ov)', extras: '14' },
      inning2: { team: 'South Africa', total: '286 all out (84.4 Ov)', extras: '12' },
      inning3: { team: 'England', total: '186/5 (48.2 Ov)', extras: '8' }
    },
    commentary: [
      { id: 'c201', ball: '48.2', over: 49, runs: 1, tag: 'SINGLE', text: 'Root pushes Rabada to deep cover for a comfortable single.', bowler: 'Kagiso Rabada', batsman: 'Joe Root' },
      { id: 'c202', ball: '48.1', over: 49, runs: 0, tag: 'DOT', text: 'Good length delivery outside off, left alone by Root.', bowler: 'Kagiso Rabada', batsman: 'Joe Root' }
    ]
  },
  {
    _id: 'm3',
    title: 'India vs England, 1st T20I',
    series: 'England tour of India 2025',
    matchFormat: 'T20',
    status: 'UPCOMING',
    statusNote: 'Match starts at 7:00 PM IST (13:30 GMT)',
    venue: 'Wankhede Stadium, Mumbai',
    date: 'Tomorrow',
    time: '19:00 IST',
    toss: 'Toss at 18:30 IST',
    featured: false,
    teamA: {
      id: 'ind',
      name: 'India',
      shortName: 'IND',
      flag: 'https://flagcdn.com/w160/in.png',
      score: 'Yet to Bat',
      overs: '0.0'
    },
    teamB: {
      id: 'eng',
      name: 'England',
      shortName: 'ENG',
      flag: 'https://flagcdn.com/w160/gb-eng.png',
      score: 'Yet to Bat',
      overs: '0.0'
    },
    commentary: [
      { id: 'c301', ball: '0.0', over: 0, runs: 0, tag: 'INFO', text: 'Pitch report: Fast outfield with true bounce. High-scoring encounter anticipated under the Mumbai lights.' }
    ]
  },
  {
    _id: 'm4',
    title: 'Pakistan vs New Zealand, 2nd ODI',
    series: 'New Zealand tour of Pakistan 2025',
    matchFormat: 'ODI',
    status: 'UPCOMING',
    statusNote: 'Pakistan lead 3-match series 1-0',
    venue: 'National Stadium, Karachi',
    date: 'In 2 Days',
    time: '14:30 IST',
    toss: 'Toss at 14:00 IST',
    featured: false,
    teamA: {
      id: 'pak',
      name: 'Pakistan',
      shortName: 'PAK',
      flag: 'https://flagcdn.com/w160/pk.png',
      score: 'Yet to Bat',
      overs: '0.0'
    },
    teamB: {
      id: 'nz',
      name: 'New Zealand',
      shortName: 'NZ',
      flag: 'https://flagcdn.com/w160/nz.png',
      score: 'Yet to Bat',
      overs: '0.0'
    },
    commentary: []
  },
  {
    _id: 'm5',
    title: 'CSK vs KKR, Final',
    series: 'Indian Premier League 2025',
    matchFormat: 'T20',
    status: 'COMPLETED',
    statusNote: 'CSK won by 5 wickets (with 2 balls remaining)',
    venue: 'Narendra Modi Stadium, Ahmedabad',
    date: 'Yesterday',
    time: 'Match Ended',
    toss: 'CSK won the toss and elected to field',
    featured: false,
    teamA: {
      id: 'csk',
      name: 'Chennai Super Kings',
      shortName: 'CSK',
      flag: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&auto=format&fit=crop&q=80',
      score: '184/5',
      overs: '19.4',
      crr: 9.35
    },
    teamB: {
      id: 'kkr',
      name: 'Kolkata Knight Riders',
      shortName: 'KKR',
      flag: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=160&auto=format&fit=crop&q=80',
      score: '180/7',
      overs: '20.0',
      crr: 9.0
    },
    scorecard: {
      inning1: {
        team: 'Kolkata Knight Riders',
        total: '180/7 (20.0 Ov)',
        extras: '9'
      },
      inning2: {
        team: 'Chennai Super Kings',
        total: '184/5 (19.4 Ov)',
        extras: '12'
      }
    },
    commentary: [
      { id: 'c501', ball: '19.4', over: 20, runs: 4, tag: 'FOUR', text: 'FOUR! Smashed down the ground! CSK clinch their 6th IPL Championship title in an absolute thriller in Ahmedabad!' }
    ]
  }
];

export const newsArticles = [
  {
    _id: 'n1',
    title: "Kohli's Masterclass Anchors Epic Chase at MCG",
    subtitle: 'India icon strikes sublime 78* as Australia are pushed to the brink in Champions Trophy final.',
    category: 'Match Report',
    coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80',
    author: 'Cricbuzz Editorial Team',
    readTime: '5 min read',
    featured: true,
    publishedAt: new Date(),
    tags: ['IND vs AUS', 'Virat Kohli', 'Champions Trophy', 'MCG'],
    content: `In front of 88,000 roaring spectators at the Melbourne Cricket Ground, Virat Kohli once again demonstrated why he is regarded as the quintessential chase-master. Chasing Australia's imposing 195/6, Kohli built his innings with surgical precision before launching an assault in the death overs alongside Hardik Pandya.`
  },
  {
    _id: 'n2',
    title: "Pat Cummins on Bowling at the Death: 'The Margin for Error is Millimeters'",
    subtitle: 'Australian captain breaks down the tactical nuances of yorkers and slower ball variations in T20s.',
    category: 'Exclusive',
    coverImage: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&auto=format&fit=crop&q=80',
    author: 'Som Shekhar',
    readTime: '4 min read',
    featured: false,
    publishedAt: new Date(Date.now() - 3600000 * 4),
    tags: ['Pat Cummins', 'Australia', 'Bowling Tactics'],
    content: `"When you have batters who can hit you 360 degrees, you cannot afford to miss your target by even two inches," explained Cummins. "We spend hours analyzing wagon wheels and pitch conditions to make split-second decisions at the top of the mark."`
  },
  {
    _id: 'n3',
    title: "ICC Releases Updated World Test Championship Points Table and Regulations",
    subtitle: 'Revamped over-rate penalties and bonus points introduced for high-scoring away draws.',
    category: 'News',
    coverImage: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&auto=format&fit=crop&q=80',
    author: 'Ravi Teja',
    readTime: '3 min read',
    featured: false,
    publishedAt: new Date(Date.now() - 3600000 * 12),
    tags: ['ICC', 'WTC', 'Test Cricket', 'Rankings'],
    content: `The International Cricket Council has formally announced key revisions to the World Test Championship cycle. India and Australia maintain the top two spots with 121 and 116 points respectively.`
  },
  {
    _id: 'n4',
    title: "The Science Behind Bumrah's Deceptive Slower Delivery",
    subtitle: 'Biomechanic breakdown of how Jasprit Bumrah disguises pace off the ball with zero arm drop.',
    category: 'Analysis',
    coverImage: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=800&auto=format&fit=crop&q=80',
    author: 'Dr. Ian Higgins',
    readTime: '6 min read',
    featured: false,
    publishedAt: new Date(Date.now() - 3600000 * 24),
    tags: ['Jasprit Bumrah', 'Fast Bowling', 'Biomechanics'],
    content: `Jasprit Bumrah's hyperextended arm and unique release point make picking the slower ball almost impossible for batters. Even the world's most aggressive hitters have routinely failed to detect the 20km/h speed difference.`
  }
];
