const { getDb } = require('../db');

module.exports = {
  async getAll() {
    const db = getDb();
    const rows = await db.all('SELECT * FROM churches ORDER BY id');
    return rows;
  },
  async getById(id) {
    const db = getDb();
    const row = await db.get('SELECT * FROM churches WHERE id = ?', [id]);
    return row;
  },
  async create(data) {
    const db = getDb();
    const { name, senior_pastor, senior_pastor_avatar, pastor, pastor_avatar, assistant_pastor, assistant_pastor_avatar, address, city, state, zip, contact_email, contact_phone, website, logo_url, banner_url, description } = data;
    const result = await db.run(
      `INSERT INTO churches (name, senior_pastor, senior_pastor_avatar, pastor, pastor_avatar, assistant_pastor, assistant_pastor_avatar, address, city, state, zip, contact_email, contact_phone, website, logo_url, banner_url, description)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [name, senior_pastor, senior_pastor_avatar, pastor, pastor_avatar, assistant_pastor, assistant_pastor_avatar, address, city, state, zip, contact_email, contact_phone, website, logo_url, banner_url, description]
    );
    
    // Get the inserted record
    const inserted = await db.get('SELECT * FROM churches WHERE id = ?', [result.lastID]);
    return inserted;
  },
  async update(id, data) {
    const db = getDb();
    const fields = [];
    const values = [];
    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
    values.push(id);
    await db.run(
      `UPDATE churches SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    // Get the updated record
    const updated = await db.get('SELECT * FROM churches WHERE id = ?', [id]);
    return updated;
  },
  async remove(id) {
    const db = getDb();
    await db.run('DELETE FROM churches WHERE id = ?', [id]);
    return true;
  }
};
