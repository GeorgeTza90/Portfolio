exports.seed = async function(knex) {
  await knex('contacts').del();
  await knex('contacts').insert([
    { id: 1, firstName: 'Pop', lastName: 'Ai', email: 'popai@mail.com', phoneNumber: '+3066699966699', topic: 'nope', message: 'hi!'  }    
  ]);
};
