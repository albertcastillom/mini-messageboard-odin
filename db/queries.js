const pool = require("./pool");

async function getAllMessages() {
  const result = await pool.query("SELECT * FROM messages ORDER BY added DESC");
  return result.rows;
}

async function getMessageById(id) {
  const result = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
  return result.rows[0];
}

async function addMessage(username, message) {
  const result = await pool.query(
    "INSERT INTO messages (username, message) VALUES ($1, $2) RETURNING id, username, message, added",
    [username, message]
  );
  return result.rows[0];
}

module.exports = {
  getAllMessages,
  getMessageById,
  addMessage,
};