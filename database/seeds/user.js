
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, userName: 'testUser', password: hashedPassword},
        {id: 2, userName: 'testUserTwo', password: hashedPassword}
      ]);
    });
};
