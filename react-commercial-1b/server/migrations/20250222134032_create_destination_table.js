exports.up = function(knex) {
    return knex.schema.createTable('destination', function(table) {
      table.increments('id'); 
      table.string('planet').notNullable();
      table.longtext('text').notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.string('city');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('destination');
  };