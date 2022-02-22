const MembersService = {
  getAllMembers(knex) {
    return knex.select('*').from('members');
  }
};

module.exports = MembersService;