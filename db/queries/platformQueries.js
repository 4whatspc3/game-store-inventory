import pool from "../pool.js";

const insertPlatform = async (name) => {
    let { rows } = await pool.query(
        `INSERT INTO platforms (name) VALUES ($1)
         ON CONFLICT (name) DO NOTHING
         RETURNING id`,
        [name]
    );

    if (rows[0] === undefined) {
        ({ rows } = await pool.query("SELECT id FROM platforms WHERE name = $1", [name]));
    }

    return rows[0].id;
}

const insertGamePlatform = async (game_id, platform_id) => {
    await pool.query("INSERT INTO games_platforms (game_id, platform_id) VALUES ($1, $2)", [game_id, platform_id]);
}

export { insertGamePlatform, insertPlatform};