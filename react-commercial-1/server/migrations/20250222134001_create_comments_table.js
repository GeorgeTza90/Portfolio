exports.up = function(knex) {
    return knex.schema.createTable('comments', function(table) {
      table.increments('id'); 
      table.string('username').notNullable();
      table.string('text').notNullable();
      table.string('kind').notNullable();
      table.integer('kindID').unsigned().notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('comments');
  };
  
