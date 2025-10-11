exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('public_id',50).unique().notNullable();
    table.string('fname', 20).notNullable();
    table.string('lname', 20).notNullable();
    table.string('username_or_email', 30).notNullable();
    table.string('user_password', 20).notNullable();
    table.string('phone_number', 10).nullable();
    table.string('user_role', 10).notNullable();
    table.text('user_photo').nullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('resources_orders');
  await knex.schema.dropTableIfExists('users');
};

