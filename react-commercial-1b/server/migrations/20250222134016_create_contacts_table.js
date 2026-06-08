exports.up = function(knex) {
    return knex.schema.createTable('contacts', function(table) {
      table.increments('id'); 
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('email').notNullable();
      table.string('phoneNumber');
      table.string('topic').notNullable();
      table.string('message').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('contacts');
  };
  
