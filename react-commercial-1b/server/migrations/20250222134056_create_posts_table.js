exports.up = function(knex) {
    return knex.schema.createTable('posts', function(table) {
      table.increments('id'); 
      table.string('label').notNullable();
      table.longtext('text').notNullable();
      table.string('imgLink').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('posts');
  };
  
