const db = require('../db');

const Donations = {
  async findAllByChurch(churchId) {
    const { rows } = await db.query(
      'SELECT * FROM donations WHERE church_id = $1 ORDER BY method',
      [churchId]
    );
    return rows;
  },

  async create(churchId, data) {
    const { method, contact_name, contact_info, note } = data;
    const { rows } = await db.query(
      `INSERT INTO donations (church_id, method, contact_name, contact_info, note)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [churchId, method, contact_name, contact_info, note]
    );
    return rows[0];
  },

  async remove(id) {
    await db.query('DELETE FROM donations WHERE id = $1', [id]);
  }
};

module.exports = Donations;
