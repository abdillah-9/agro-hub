/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_roles',(column)=>{
        column.increments('id');
        column.string('role',20).notNullable();
        column.timestamps(true, true);
        column.timestamp('deleted_at').nullable();
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('user_roles');
};
