exports.up = function(knex) {
  return knex.schema.createTable('songs', function(table) {
    table.increments('id'); 
    table.string('artist').notNullable();
    table.string('title').notNullable().unique();
    table.json('instruments');
    table.json('urls');
    table.integer('byUser').unsigned().references('id').inTable('users').onDelete('SET NULL'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('songs');
};
