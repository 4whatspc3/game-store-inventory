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

export { getGames, getGameDetails };