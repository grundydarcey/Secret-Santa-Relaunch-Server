const ListsService = {
  getAllLists(knex) {
    return knex.select('*').from('personallists');
  },
  getByUserId(knex, users_id) {
    return knex
      .from('personallists')
      .select('*')
      .where('users_id', users_id)
      .all();
  }
};

module.exports = ListsService;