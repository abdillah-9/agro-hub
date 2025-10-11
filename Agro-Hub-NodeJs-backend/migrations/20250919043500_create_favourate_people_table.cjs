/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('favourate_people',(col)=>{
        col.increments('id');
        col.integer('user_id').unsigned().references('id').inTable('users');
        col.integer('favoured_user_id').unsigned().references('id').inTable('users');
        col.timestamps(true, true);
        col.timestamp('deleted_at').nullable();
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('favourate_people') 
};
