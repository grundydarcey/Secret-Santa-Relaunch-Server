const ListsService = {
  getAllLists(knex) {
    return knex.select('*').from('personallists');
  },
  getByUserId(knex, users_id) {
    return knex
      .from('personallists')
      .select('*')
      .where('users_id', users_id)
      .any();
  },
  insertListItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into('personallists')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  }
};

module.exports = ListsService;