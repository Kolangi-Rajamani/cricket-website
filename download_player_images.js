const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const players = [
  // INDIA
  {
    id: 'virat-kohli',
    name: 'Virat Kohli',
    cb: '1413/virat-kohli',
    image: 'https://www.bcci.tv/img/players/virat-kohli.png'
  },
  {
    id: 'rohit-sharma',
    name: 'Rohit Sharma',
    cb: '576/rohit-sharma',
    image: 'https://www.bcci.tv/img/players/rohit-sharma.png'
  },
  {
    id: 'jasprit-bumrah',
    name: 'Jasprit Bumrah',
    cb: '9311/jasprit-bumrah',
    image: 'https://www.bcci.tv/img/players/jasprit-bumrah.png'
  },
  {
    id: 'hardik-pandya',
    name: 'Hardik Pandya',
    cb: '9647/hardik-pandya',
    image: 'https://www.bcci.tv/img/players/hardik-pandya.png'
  },
  {
    id: 'shubman-gill',
    name: 'Shubman Gill',
    cb: '11808/shubman-gill',
    image: 'https://www.bcci.tv/img/players/shubman-gill.png'
  },
  {
    id: 'suryakumar-yadav',
    name: 'Suryakumar Yadav',
    cb: '7915/suryakumar-yadav',
    image: 'https://www.bcci.tv/img/players/suryakumar-yadav.png'
  },
  {
    id: 'rishabh-pant',
    name: 'Rishabh Pant',
    cb: '10744/rishabh-pant',
    image: 'https://www.bcci.tv/img/players/rishabh-pant.png'
  },
  {
    id: 'ravindra-jadeja',
    name: 'Ravindra Jadeja',
    cb: '587/ravindra-jadeja',
    image: 'https://www.bcci.tv/img/players/ravindra-jadeja.png'
  }
];

  // AUSTRALIA
  { id: 'pat-cummins', name: 'Pat Cummins', cb: '8095/pat-cummins' },
  { id: 'travis-head', name: 'Travis Head', cb: '10202/travis-head' },
  { id: 'steve-smith', name: 'Steve Smith', cb: '2250/steve-smith' },
  { id: 'mitchell-starc', name: 'Mitchell Starc', cb: '6258/mitchell-starc' },
  { id: 'glenn-maxwell', name: 'Glenn Maxwell', cb: '7662/glenn-maxwell' },
  { id: 'josh-hazlewood', name: 'Josh Hazlewood', cb: '6250/josh-hazlewood' },

  // ENGLAND
  { id: 'ben-stokes', name: 'Ben Stokes', cb: '6507/ben-stokes' },
  { id: 'jos-buttler', name: 'Jos Buttler', cb: '6501/jos-buttler' },
  { id: 'joe-root', name: 'Joe Root', cb: '6503/joe-root' },
  { id: 'harry-brook', name: 'Harry Brook', cb: '13160/harry-brook' },
  { id: 'jofra-archer', name: 'Jofra Archer', cb: '12170/jofra-archer' },

  // SOUTH AFRICA
  { id: 'heinrich-klaasen', name: 'Heinrich Klaasen', cb: '10209/heinrich-klaasen' },
  { id: 'kagiso-rabada', name: 'Kagiso Rabada', cb: '9586/kagiso-rabada' },
  { id: 'quinton-de-kock', name: 'Quinton de Kock', cb: '8313/quinton-de-kock' },
  { id: 'temba-bavuma', name: 'Temba Bavuma', cb: '9244/temba-bavuma' },
  { id: 'aiden-markram', name: 'Aiden Markram', cb: '9983/aiden-markram' },
  { id: 'david-miller', name: 'David Miller', cb: '6273/david-miller' },

  // PAKISTAN
  { id: 'babar-azam', name: 'Babar Azam', cb: '8359/babar-azam' },
  { id: 'mohammad-rizwan', name: 'Mohammad Rizwan', cb: '10051/mohammad-rizwan' },
  { id: 'shaheen-afridi', name: 'Shaheen Afridi', cb: '12209/shaheen-afridi' },
  { id: 'fakhar-zaman', name: 'Fakhar Zaman', cb: '11342/fakhar-zaman' },
  { id: 'naseem-shah', name: 'Naseem Shah', cb: '14387/naseem-shah' },

  // NEW ZEALAND
  { id: 'kane-williamson', name: 'Kane Williamson', cb: '6326/kane-williamson' },
  { id: 'trent-boult', name: 'Trent Boult', cb: '6244/trent-boult' },
  { id: 'mitchell-santner', name: 'Mitchell Santner', cb: '10045/mitchell-santner' },
  { id: 'devon-conway', name: 'Devon Conway', cb: '13177/devon-conway' },
  { id: 'rachin-ravindra', name: 'Rachin Ravindra', cb: '13083/rachin-ravindra' },

  // AFGHANISTAN
  { id: 'rashid-khan', name: 'Rashid Khan', cb: '10738/rashid-khan' },
  { id: 'mohammad-nabi', name: 'Mohammad Nabi', cb: '6308/mohammad-nabi' },
  { id: 'rahmanullah-gurbaz', name: 'Rahmanullah Gurbaz', cb: '18151/rahmanullah-gurbaz' },
  { id: 'fazalhaq-farooqi', name: 'Fazalhaq Farooqi', cb: '15409/fazalhaq-farooqi' },

  // SRI LANKA
  { id: 'wanindu-hasaranga', name: 'Wanindu Hasaranga', cb: '10926/wanindu-hasaranga' },
  { id: 'charith-asalanka', name: 'Charith Asalanka', cb: '11485/charith-asalanka' },
  { id: 'pathum-nissanka', name: 'Pathum Nissanka', cb: '13682/pathum-nissanka' },
  { id: 'matheesha-pathirana', name: 'Matheesha Pathirana', cb: '14419/matheesha-pathirana' },
  { id: 'kusal-mendis', name: 'Kusal Mendis', cb: '10355/kusal-mendis' }
];

const outDir = path.join(__dirname, 'frontend/public/images/players');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function downloadPlayer(p) {
  const filePath = path.join(outDir, `${p.id}.jpg`);
  try {
    const url = `https://www.cricbuzz.com/profiles/${p.cb}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    
    // Extract specific player headshot image URL
    const matches = [...html.matchAll(/https:\/\/static\.cricbuzz\.com\/a\/img\/v1\/i1\/c\d+\/[^"'?&\\><\s]+/gi)].map(m => m[0]);
    const specific = matches.filter(m => !m.endsWith('/i.jpg'));
    
    let imgUrl = specific[0];
    if (imgUrl) {
      if (!imgUrl.includes('?')) {
        imgUrl += '?d=high&p=det';
      }
      
      const imgRes = await fetch(imgUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      if (imgRes.ok) {
        const buf = Buffer.from(await imgRes.arrayBuffer());
        if (buf.length > 1000) {
          fs.writeFileSync(filePath, buf);
          console.log(`[SAVED] ${p.name} -> ${p.id}.jpg (${buf.length} bytes) from ${imgUrl}`);
          return { id: p.id, url: imgUrl, local: `/images/players/${p.id}.jpg`, size: buf.length };
        }
      }
    }

    console.warn(`[WARN] Could not get specific image for ${p.name}`);
    return null;
  } catch (err) {
    console.error(`[ERROR] ${p.name}: ${err.message}`);
    return null;
  }
}

async function main() {
  const mapping = {};
  for (const p of players) {
    const res = await downloadPlayer(p);
    if (res) {
      mapping[p.id] = res;
    }
    await new Promise(r => setTimeout(r, 100));
  }
  fs.writeFileSync(path.join(__dirname, 'player_mapping.json'), JSON.stringify(mapping, null, 2));
  console.log('Complete! Saved mapping to player_mapping.json');
}

main();
