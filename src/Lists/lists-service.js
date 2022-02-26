const ListsService = {
  getAllLists(knex) {
    return knex.select('*').from('lists');
  }
};

module.exports = ListsService;