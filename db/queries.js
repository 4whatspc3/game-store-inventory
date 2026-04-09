import pool from "./pool.js";

const searchForGame = async (title) => {
    const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${title}`)

    const data = await response.json();

    return data;
}

export { searchForGame };