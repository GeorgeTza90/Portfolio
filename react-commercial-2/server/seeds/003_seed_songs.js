
exports.seed = async function(knex) {
  await knex('songs').del();


  await knex('songs').insert([
    { id: 1, 
      artist: 'Neperia', 
      title: 'Minokawa',
      instruments: '{"inst1":"Drums","inst2":"Bass","inst3":"Guitars","inst4":"Keys","inst5":"Vox"}',
      urls: '{"inst1_url":"/Neperia/Minokawa/Minokawa_Drums.mp3","inst2_url":"/Neperia/Minokawa/Minokawa_Bass.mp3","inst3_url":"/Neperia/Minokawa/Minokawa_Guitars.mp3","inst4_url":"/Neperia/Minokawa/Minokawa_Keys.mp3","inst5_url":"/Neperia/Minokawa/Minokawa_Vox.mp3","img_url":"/Neperia/Minokawa/Minokawa_Img.jpg"}',
      byUser: 1
      }
  ]);
};


