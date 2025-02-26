exports.seed = async function(knex) {
  await knex('likes').del();
  await knex('likes').insert([
    { id: 1, kind: 'post', kindID: 1, user: 'Kostakis' },
    { id: 2, kind: 'comment', kindID: 2, user: 'Maroula' },
  ]);
};
