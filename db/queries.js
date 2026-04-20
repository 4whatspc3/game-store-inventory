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

const insertNewGame = async (title, description, release_date, image_url, price, stock) => {
    const { rows } = await pool.query(`INSERT INTO games (title, description, release_date, image_url, price, stock)
                      VALUES ($1, $2, $3, $4, $5, $6)
                      RETURNING id`,
                      [title, description, release_date, image_url, price, stock]
                    );

    return rows[0].id
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

const deleteGame = async (id) => {
    await pool.query("DELETE FROM games WHERE id = $1", [id]);
}

const getAllGames = async () => {
    const { rows } = await pool.query("SELECT * FROM games ORDER BY title ASC");
    return rows;
}

const getGameById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
    return rows[0];
}

const updateGame = async (id, price, stock) => {
    await pool.query(
        "UPDATE games SET price = $1, stock = $2 WHERE id = $3",
        [price, stock, id]
    );
}

export { getGames, 
        getGameDetails, 
        insertNewGenre, 
        insertNewGame, 
        insertGameGenre,
        deleteGame,
        getAllGames,
        updateGame,
        getGameById};