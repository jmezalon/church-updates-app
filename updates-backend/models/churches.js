const db = require('../db');

module.exports = {
  async getAll() {
    const { rows } = await db.query('SELECT * FROM churches ORDER BY id');
    return rows;
  },
  async getById(id) {
    const { rows } = await db.query('SELECT * FROM churches WHERE id = $1', [id]);
    return rows[0];
  },
  async create(data) {
    const { name, senior_pastor, senior_pastor_avatar, pastor, pastor_avatar, assistant_pastor, assistant_pastor_avatar, address, city, state, zip, contact_email, contact_phone, website, logo_url, banner_url, description } = data;
    const { rows } = await db.query(
      `INSERT INTO churches (name, senior_pastor, senior_pastor_avatar, pastor, pastor_avatar, assistant_pastor, assistant_pastor_avatar, address, city, state, zip, contact_email, contact_phone, website, logo_url, banner_url, description)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *`,
      [name, senior_pastor, senior_pastor_avatar, pastor, pastor_avatar, assistant_pastor, assistant_pastor_avatar, address, city, state, zip, contact_email, contact_phone, website, logo_url, banner_url, description]
    );
    return rows[0];
  },
  async update(id, data) {
    const fields = [];
    const values = [id];
    let idx = 2;
    for (const key in data) {
      fields.push(`${key} = $${idx}`);
      values.push(data[key]);
      idx++;
    }
    const { rows } = await db.query(
      `UPDATE churches SET ${fields.join(', ')} WHERE id = $1 RETURNING *`,
      values
    );
    return rows[0];
  },
  async remove(id) {
    await db.query('DELETE FROM churches WHERE id = $1', [id]);
    return true;
  }
};
