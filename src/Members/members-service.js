const MembersService = {
  getAllMembers(knex) {
    return knex.select('*').from('members');
  },
  getById(knex, id) {
    return knex
      .from('members')
      .select('*')
      .where('id', id)
      .first();
  }
};

module.exports = MembersService;