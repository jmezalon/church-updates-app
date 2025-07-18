const db = require('../db');

module.exports = {
  async getAllByChurch(churchId) {
    const { rows } = await db.query('SELECT * FROM events WHERE church_id = $1 ORDER BY start_datetime', [churchId]);
    return rows;
  },
  async getById(id) {
    const { rows } = await db.query('SELECT * FROM events WHERE id = $1', [id]);
    return rows[0];
  },
  async create(churchId, data) {
    const { title, description, location, start_datetime, end_datetime, image_url, price, contact_email, contact_phone, website, favorites_count } = data;
    const { rows } = await db.query(
      `INSERT INTO events (church_id, title, description, location, start_datetime, end_datetime, image_url, price, contact_email, contact_phone, website, favorites_count)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [churchId, title, description, location, start_datetime, end_datetime, image_url, price, contact_email, contact_phone, website, favorites_count || 0]
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
      `UPDATE events SET ${fields.join(', ')} WHERE id = $1 RETURNING *`,
      values
    );
    return rows[0];
  },
  async remove(id) {
    await db.query('DELETE FROM events WHERE id = $1', [id]);
    return true;
  }
};
