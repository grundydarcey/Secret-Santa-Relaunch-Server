const ListsService = {
  getAllLists(knex) {
    return knex.select('*').from('personallists');
  }
};

module.exports = ListsService;