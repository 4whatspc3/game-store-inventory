import pool from "../pool.js";

const insertNewGenre = async (name) => {
    let { rows } = await pool.query(
        `INSERT INTO genres (name) VALUES ($1)
         ON CONFLICT (name) DO NOTHING
         RETURNING id`,
        [name]
    );

    if (rows[0] === undefined) {
        ({ rows } = await pool.query("SELECT id FROM genres WHERE name = $1", [name]));
    }

    return rows[0].id;
}

const insertGameGenre = async (game_id, genre_id) => {
    await pool.query("INSERT INTO games_genres (game_id, genre_id) VALUES ($1, $2)", [game_id, genre_id]);
}

const getAllGenres = async () => {
    const { rows } = await pool.query("SELECT * FROM genres ORDER BY name ASC");
    return rows;
}

const getGamesByGenre = async (genreId) => {
    const { rows } = await pool.query(`
        SELECT 
            games.*,
            JSON_AGG(JSON_BUILD_OBJECT('id', genres.id, 'name', genres.name)) AS genres
        FROM games
        LEFT JOIN games_genres ON games.id = games_genres.game_id
        LEFT JOIN genres ON games_genres.genre_id = genres.id
        WHERE games_genres.genre_id = $1
        GROUP BY games.id
        ORDER BY games.title ASC
    `, [genreId]);
    return rows;
}

const getGenreById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM genres WHERE id = $1", [id]);
    return rows[0];
}

export { getAllGenres, getGamesByGenre, getGenreById, insertGameGenre, insertNewGenre};