
exports.seed = async function(knex) {
  await knex('songs').del();


  await knex('songs').insert([
    { id: 1, 
      artist: 'Neperia', 
      title: 'Minokawa',
      instruments: '{"inst1":"Drums","inst2":"Bass","inst3":"Guitars","inst4":"Keys","inst5":"Vox"}',
      urls: '{"img_url": "https://res.cloudinary.com/dxxlzccju/image/upload/v1743612127/Minokawa_Img_fcvhuq.jpg", "inst1_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743612179/Minokawa_Drums_mkesti.mp3", "inst2_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743612183/Minokawa_Bass_ejpsxe.mp3", "inst3_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743612194/Minokawa_Guitars_vhh2sx.mp3", "inst4_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743612179/Minokawa_Keys_cpyvqn.mp3", "inst5_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743612184/Minokawa_Vox_ribvmz.mp3"}',
      byUser: 1
      }
  ]);
};


