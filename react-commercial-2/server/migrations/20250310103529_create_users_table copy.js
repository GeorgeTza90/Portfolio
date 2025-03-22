exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id'); 
      table.string('username').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.boolean('premium').defaultTo(false);
      table.integer('gp').defaultTo(3);
      table.integer('avatar').unsigned().references('id').inTable('avatars').onDelete('SET NULL'); 
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };