/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('resources', (table)=>{
        table.increments('id');
        table.string('resource_name',30).notNullable();
        table.integer('seller_id').unsigned().references('id').inTable('users');
        table.string('unit',10).notNullable();
        table.string('minimum_sellable_quantity', 20).notNullable();
        table.decimal('total_quantity',10,2).notNullable();
        table.decimal('price_per_minimum_sellable_quantity',10,2).notNullable();
        table.string('description',100);
        table.text('resource_photo');
        table.timestamps(true, true);
        table.timestamp('deleted_at').nullable();
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('resources');  
};
