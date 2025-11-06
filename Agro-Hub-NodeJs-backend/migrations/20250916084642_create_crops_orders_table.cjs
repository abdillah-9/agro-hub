exports.up = function(knex) {
  return knex.schema.createTable('crops_orders', (table) => {
    table.increments('id');
    table.string('public_id', 30).unique().notNullable(); // new public ID
    table.string('status', 10).notNullable();
    // table.integer('seller_id').unsigned().notNullable();  // integer FK (users.id) I MUST DELETE THIS ONE
    table.integer('buyer_id').unsigned().notNullable();   // integer FK (users.id)
    table.integer('ordered_crop_id').unsigned().notNullable(); // integer FK (crops.id)
    table.decimal('ordered_crop_quantity', 10, 2).notNullable();
    table.decimal('paid_amount', 10, 2).nullable();
    table.string('purchase_receipt').nullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
    // Foreign key constraints 
    // table.foreign('seller_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('buyer_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('ordered_crop_id').references('id').inTable('crops').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('crops_orders');
};
