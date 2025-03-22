exports.up = function(knex) {
    return knex.schema.createTable('avatars', function(table) {
      table.increments('id'); 
      table.string('url');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('avatars');
  };