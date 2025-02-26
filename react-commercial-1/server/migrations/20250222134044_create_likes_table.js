exports.up = function(knex) {
    return knex.schema.createTable('likes', function(table) {
      table.increments('id');     
      table.string('kind').notNullable();
      table.integer('kindID').unsigned().notNullable();
      table.string('user').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('likes');
  };
  
