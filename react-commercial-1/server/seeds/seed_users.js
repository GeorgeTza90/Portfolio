const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  await knex('users').del();

  const hashedPassword = await bcrypt.hash('!@#$1234Aa', 10);
  await knex('users').insert([
    { id: 1, username: 'Pop_Ai', email: 'popai@mail.com', password: hashedPassword }
  ]);
};


