
exports.seed = async function(knex) {
  await knex('avatars').del();


  await knex('avatars').insert([
    { id: 1,  
      url: '/avatars/avatar_01.jpg',      
    },
    { id: 2,  
      url: '/avatars/avatar_02.jpg',      
    },
    { id: 3,  
      url: '/avatars/avatar_03.jpg',      
    },
    { id: 4,  
      url: '/avatars/avatar_04.jpg',      
    },
    { id: 5,  
      url: '/avatars/avatar_05.jpg',      
    },
    { id: 6,  
      url: '/avatars/avatar_06.jpg',      
    },
    { id: 7,  
      url: '/avatars/avatar_07.jpg',      
    },
    { id: 8,  
      url: '/avatars/avatar_08.jpg',      
    },
    { id: 9,  
      url: '/avatars/avatar_09.jpg',      
    },
    { id: 10,  
      url: '/avatars/avatar_10.jpg',      
    },
  ]);
};


