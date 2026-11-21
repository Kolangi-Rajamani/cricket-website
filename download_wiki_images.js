const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const wikiImages = [
  { id: 'travis-head', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/RSA_vs_AUS_Day_3-Travis_Head-1.jpg' },
  { id: 'mitchell-starc', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/RSA_vs_AUS_Day_1_-_Mitchel_Starch_-2.jpg' },
  { id: 'josh-hazlewood', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/2018.01.05.11.03.14-Josh_Hazelwood.jpg/640px-2018.01.05.11.03.14-Josh_Hazelwood.jpg' },
  { id: 'ben-stokes', url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/3_14_Captain_Ben_%28cropped%29_%28cropped%29.jpg' },
  { id: 'jos-buttler', url: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Jos_Buttler_in_2023.jpg' },
  { id: 'joe-root', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/2_05_Root_hundred.jpg' },
  { id: 'harry-brook', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Harry_Brook_%2851225504151%29_%28cropped%29.jpg' },
  { id: 'jofra-archer', url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Jofra_Archer_%283%29.jpg' },
  { id: 'kagiso-rabada', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/RSA_vs_AUS_Day_2_-_Kagiso_Rabada.jpg' },
  { id: 'quinton-de-kock', url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/QUINTON_DE_KOCK_%2815681398316%29.jpg' },
  { id: 'temba-bavuma', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Temba_Bavuma_Breaks_Silence_on_Injury_Comeback%2C_Brevis%E2%80%99_R16_5m_Shock_%26_SA20_Snub%21%2C_2025_%28cropped%29.png' },
  { id: 'aiden-markram', url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Aiden_Markram_interview_after_WTC_final_2025_%28cropped%29.png' },
  { id: 'david-miller', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/DAVID_MILLER_%2815704846295%29.jpg' },
  { id: 'mohammad-rizwan', url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/M_Rizwan.jpg' },
  { id: 'shaheen-afridi', url: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Shaheen_Afridi_%282%29.jpg' },
  { id: 'fakhar-zaman', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Fakhar_Zaman%2C_Pakistan_vs_Sri_Lanka%2C_1st_ODI%2C_2017.jpg' },
  { id: 'naseem-shah', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Naseem_Shah%2C_Sri_Lanka_vs_Pakistan_-_2nd_TEST_Match_-_SSC%2C_Colombo_%28cropped%29.jpg' },
  { id: 'trent-boult', url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/2018.02.03.22.23.14-AUSvNZL_T20_AUS_innings%2C_SCG_%2839533156665%29.jpg' },
  { id: 'rachin-ravindra', url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Rachin_Ravindra.jpg' },
  { id: 'tim-southee', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Tim_Southee_3_%28cropped%29.jpg' },
  { id: 'martin-guptill', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Martin_Guptill_2_%28cropped%29.jpg' },
  { id: 'mohammad-nabi', url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Mohammad_Nabi-Australia.jpg' },
  { id: 'fazalhaq-farooqi', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Fazalhaq_Farooqi.jpg' },
  { id: 'angelo-mathews', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Angelo_Mathews.jpg' },
  { id: 'lasith-malinga', url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Lasith_Malinga_portrait.jpg' },
  { id: 'dimuth-karunaratne', url: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Dimuth_Karunaratne_%281%29.jpg' },
  { id: 'dinesh-chandimal', url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Dinesh_Chandimal.JPG' }
];

const outDir = path.join(__dirname, 'frontend/public/images/players');

for (const item of wikiImages) {
  const dest = path.join(outDir, `${item.id}.jpg`);
  try {
    const cmd = `curl.exe -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -o "${dest}" "${item.url}"`;
    execSync(cmd);
    const stat = fs.statSync(dest);
    console.log(`[WIKI OK] ${item.id} -> ${stat.size} bytes`);
  } catch (e) {
    console.error(`[WIKI ERR] ${item.id}: ${e.message}`);
  }
}
