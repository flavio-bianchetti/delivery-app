'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('sales', [
      {
        id: 1,
        user_id: 1,
        seller_id: 2,
        total_price: 10,
        delivery_address: "asdasdasd",
        delivery_number: "12323",
        sale_date: new Date("2011-08-01T19:58:00.000Z"),
        status: "Entregue"
      },
      {
        id: 2,
        user_id: 2,
        seller_id: 2,
        total_price: 100,
        delivery_address: "xxxx",
        delivery_number: "90909090909090",
        sale_date: new Date("2011-09-19T19:58:00.000Z"),
        status: "Pendente"
      },
  ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
