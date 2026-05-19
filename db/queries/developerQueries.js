import pool from "../pool.js";

const insertDeveloper = async (name) => {
    let { rows } = await pool.query(
        `INSERT INTO developers (name) VALUES ($1)
         ON CONFLICT (name) DO NOTHING
         RETURNING id`,
        [name]
    );

    if (rows[0] === undefined) {
        ({ rows } = await pool.query("SELECT id FROM developers WHERE name = $1", [name]));
    }

    return rows[0].id;
}

const insertGameDeveloper = async (game_id, developer_id) => {
    await pool.query("INSERT INTO games_developers (game_id, developer_id) VALUES ($1, $2)", [game_id, developer_id]);
}

export {insertDeveloper, insertGameDeveloper};