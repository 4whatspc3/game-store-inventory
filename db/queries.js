import pool from "./pool.js";

const getGames = async (title) => {
    const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${title}`)

    const data = await response.json();

    return data;
}

const getGameDetails = async (id) => {
    const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`)

    const data = await response.json();

    return data;
}

const insertNewGame = async (title, description, release_date, image_url, price, rating, metacritic) => {
    const { rows } = await pool.query(
        `INSERT INTO games (title, description, release_date, image_url, price, rating, metacritic)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id`,
        [title, description, release_date, image_url, price, rating, metacritic]
    );

    return rows[0].id;
}

const insertNewGenre = async (name) => {
    let { rows } = await pool.query(`INSERT INTO genres (name) VALUES ($1)
                     ON CONFLICT (name) DO NOTHING
                     RETURNING id`, 
                     [name]);

    if (rows[0] === undefined){
        ({ rows } = await pool.query(`SELECT id FROM genres WHERE name = $1`, [name]));
    }

    return rows[0].id;

}

const insertGameGenre = async (game_id, genre_id) => {
    const { rows } = await pool.query(`INSERT INTO games_genres (game_id, genre_id) VALUES ($1, $2)`, [game_id, genre_id]);
}

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
};

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
};

const insertGamePlatform = async (game_id, platform_id) => {
    await pool.query(
        "INSERT INTO games_platforms (game_id, platform_id) VALUES ($1, $2)",
        [game_id, platform_id]
    );
};

const insertGameDeveloper = async (game_id, developer_id) => {
    await pool.query(
        "INSERT INTO games_developers (game_id, developer_id) VALUES ($1, $2)",
        [game_id, developer_id]
    );
};

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

const getAllGenres = async () => {
    const { rows } = await pool.query("SELECT * FROM genres ORDER BY name ASC");
    return rows;
}

const getGameById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
    return rows[0];
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
};

const updateGame = async (id, price) => {
    await pool.query(
        "UPDATE games SET price = $1 WHERE id = $2",
        [price, id]
    );
}

export { 
    getGames, 
    getGameDetails, 
    insertNewGenre, 
    insertNewGame, 
    insertGameGenre,
    insertPlatform,
    insertDeveloper,
    insertGamePlatform,
    insertGameDeveloper,
    deleteGame,
    getAllGames,
    getAllGenres,
    updateGame,
    getGameById,
    getGamesByGenre,
    getGenreById,
    getGameByIdComplete
};