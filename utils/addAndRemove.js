const addGame = (arr, game) => {
    const alreadyAdded = arr.some((el) => el.id === game.id);

    if (!alreadyAdded) {
        arr.push(game);
    }
}

const removeGame = (arr, id) => {
    const gameId = Number(id);

    return arr.filter((el) => el.id !== gameId);
}

export {addGame, removeGame};