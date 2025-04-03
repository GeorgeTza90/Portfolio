
exports.seed = async function(knex) {
  await knex('songs').del();

  await knex('songs').insert([
    { id: 1, 
      artist: 'TZA', 
      title: 'The Land Of Grief (Ganesha)',
      instruments: '{"inst1": "Drums", "inst2": "Bass", "inst3": "Pads", "inst4": "Arpegiators", "inst5": "Effects"}',
      urls: '{"img_url": "TZA/The Land Of Grief (Ganesha)/The Land Of Grief (Ganesha)_Img.jpg", "inst1_url": "TZA/The Land Of Grief (Ganesha)/The Land Of Grief (Ganesha)_Drums.mp3", "inst2_url": "TZA/The Land Of Grief (Ganesha)/The Land Of Grief (Ganesha)_Bass.mp3", "inst3_url": "TZA/The Land Of Grief (Ganesha)/The Land Of Grief (Ganesha)_Pads.mp3", "inst4_url": "TZA/The Land Of Grief (Ganesha)/The Land Of Grief (Ganesha)_Arpegiators.mp3", "inst5_url": "TZA/The Land Of Grief (Ganesha)/The Land Of Grief (Ganesha)_Effects.mp3"}',
      byUser: 1
      }
  ]);

  await knex('songs').insert([
    { id: 2, 
      artist: 'Neperia', 
      title: 'Minokawa',
      instruments: '{"inst1":"Drums","inst2":"Bass","inst3":"Guitars","inst4":"Keys","inst5":"Vox"}',
      urls: '{"img_url": "Neperia/Minokawa/Minokawa_Img.jpg", "inst1_url": "Neperia/Minokawa/Minokawa_Drums.mp3", "inst2_url": "Neperia/Minokawa/Minokawa_Bass.mp3", "inst3_url": "Neperia/Minokawa/Minokawa_Guitars.mp3", "inst4_url": "Neperia/Minokawa/Minokawa_Keys.mp3", "inst5_url": "Neperia/Minokawa/Minokawa_Vox.mp3"}',
      byUser: 1
      }
  ]);
};


