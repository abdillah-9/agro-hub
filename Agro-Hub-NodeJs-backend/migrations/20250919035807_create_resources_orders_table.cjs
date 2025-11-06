/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('resources_orders', (column)=>{
        column.increments('id');
        column.string('public_id', 30).unique().notNullable(); // new public ID
        column.string('status', 10).notNullable();
        column.integer('buyer_id').unsigned().notNullable();   // integer FK (users.id)
        column.integer('ordered_resource_id').unsigned().notNullable(); // integer FK (crops.id)
        column.decimal('ordered_resource_quantity', 10, 2).notNullable();
        column.decimal('paid_amount', 10, 2).nullable();
        column.string('purchase_receipt').nullable();
        column.timestamps(true, true);
        column.timestamp('deleted_at').nullable();
        // Foreign key constraints 
        column.foreign('buyer_id').references('id').inTable('users').onDelete('CASCADE');
        column.foreign('ordered_resource_id').references('id').inTable('resources').onDelete('CASCADE');
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('resources_orders');
  
};
