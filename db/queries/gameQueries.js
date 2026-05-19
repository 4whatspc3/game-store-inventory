import pool from "../pool.js";

const insertNewGame = async (title, description, release_date, image_url, price, rating, metacritic) => {
    const { rows } = await pool.query(
        `INSERT INTO games (title, description, release_date, image_url, price, rating, metacritic)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id`,
        [title, description, release_date, image_url, price, rating, metacritic]
    );
    return rows[0].id;
}

const deleteGame = async (id) => {
    await pool.query("DELETE FROM games WHERE id = $1", [id]);
}

const getAllGames = async () => {
    const { rows } = await pool.query(`
        SELECT 
            games.*,
            JSON_AGG(JSON_BUILD_OBJECT('id', genres.id, 'name', genres.name)) AS genres
        FROM games
        LEFT JOIN games_genres ON games.id = games_genres.game_id
        LEFT JOIN genres ON games_genres.genre_id = genres.id
        GROUP BY games.id
        ORDER BY games.title ASC
    `);
    return rows;
}

const getGameById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
    return rows[0];
}

const getGameByIdComplete = async (id) => {
    const { rows } = await pool.query(`
        SELECT
            games.*,
            (
                SELECT JSON_AGG(JSON_BUILD_OBJECT('id', genres.id, 'name', genres.name))
                FROM genres
                JOIN games_genres ON genres.id = games_genres.genre_id
                WHERE games_genres.game_id = games.id
            ) AS genres,
            (
                SELECT JSON_AGG(JSON_BUILD_OBJECT('id', platforms.id, 'name', platforms.name))
                FROM platforms
                JOIN games_platforms ON platforms.id = games_platforms.platform_id
                WHERE games_platforms.game_id = games.id
            ) AS platforms,
            (
                SELECT JSON_AGG(JSON_BUILD_OBJECT('id', developers.id, 'name', developers.name))
                FROM developers
                JOIN games_developers ON developers.id = games_developers.developer_id
                WHERE games_developers.game_id = games.id
            ) AS developers
        FROM games
        WHERE games.id = $1
    `, [id]);
    return rows[0];
}

const updateGame = async (id, price) => {
    await pool.query("UPDATE games SET price = $1 WHERE id = $2", [price, id]);
}

export { insertNewGame, deleteGame, getAllGames, getGameById, getGameByIdComplete, updateGame};