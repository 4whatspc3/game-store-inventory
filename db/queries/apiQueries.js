const getGames = async (title) => {
    const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${title}`);
    return await response.json();
}

const getGameDetails = async (id) => {
    const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`);
    return await response.json();
}

export { getGames, getGameDetails};