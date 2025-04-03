
exports.seed = async function(knex) {
  await knex('songs').del();

  await knex('songs').insert([
    { id: 1, 
      artist: 'TZA', 
      title: 'The Land Of Grief (Ganesha)',
      instruments: '{"inst1": "Drums", "inst2": "Bass", "inst3": "Guitars", "inst4": "Keys", "inst5": "Vox"}',
      urls: '{"img_url": "https://res.cloudinary.com/dxxlzccju/image/upload/v1743675674/TZA/The%20Land%20Of%20Grief%20%28Ganesha%29/The%20Land%20Of%20Grief%20%28Ganesha%29_Img.jpg", "inst1_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743675693/TZA/The%20Land%20Of%20Grief%20%28Ganesha%29/The%20Land%20Of%20Grief%20%28Ganesha%29_Drums.mp3", "inst2_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743675713/TZA/The%20Land%20Of%20Grief%20%28Ganesha%29/The%20Land%20Of%20Grief%20%28Ganesha%29_Bass.mp3", "inst3_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743675729/TZA/The%20Land%20Of%20Grief%20%28Ganesha%29/The%20Land%20Of%20Grief%20%28Ganesha%29_Pads.mp3", "inst4_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743675749/TZA/The%20Land%20Of%20Grief%20%28Ganesha%29/The%20Land%20Of%20Grief%20%28Ganesha%29_Arpegiators.mp3", "inst5_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743675769/TZA/The%20Land%20Of%20Grief%20%28Ganesha%29/The%20Land%20Of%20Grief%20%28Ganesha%29_Effects.mp3"}',
      byUser: 1
      }
  ]);

  await knex('songs').insert([
    { id: 2, 
      artist: 'Neperia', 
      title: 'Minokawa',
      instruments: '{"inst1":"Drums","inst2":"Bass","inst3":"Guitars","inst4":"Keys","inst5":"Vox"}',
      urls: '{"img_url": "https://res.cloudinary.com/dxxlzccju/image/upload/v1743612127/Minokawa_Img_fcvhuq.jpg", "inst1_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743612179/Minokawa_Drums_mkesti.mp3", "inst2_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743612183/Minokawa_Bass_ejpsxe.mp3", "inst3_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743612194/Minokawa_Guitars_vhh2sx.mp3", "inst4_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743612179/Minokawa_Keys_cpyvqn.mp3", "inst5_url": "https://res.cloudinary.com/dxxlzccju/video/upload/v1743612184/Minokawa_Vox_ribvmz.mp3"}',
      byUser: 1
      }
  ]);
};


