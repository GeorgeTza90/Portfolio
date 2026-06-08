exports.seed = async function(knex) {
  await knex('comments').del();
  await knex('comments').insert([
    { id: 1, username: 'Kostakis', text: 'Ti les twra?', kind: 'post', kindID: 1 },
    { id: 2, username: 'Maroula', text: 'Exw paei, einai fantastika!!!! <#', kind: 'post', kindID: 1 },
    { id: 3, username: 'Takis', text: 'Not intersted', kind: 'post', kindID: 2 },
    { id: 4, username: 'Takis', text: 'Learn to speak Greek!!!', kind: 'post', kindID: 1 },
  ]);
};
