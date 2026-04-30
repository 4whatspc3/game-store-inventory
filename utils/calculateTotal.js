const calculateTotal = (cart) => {
    return cart.reduce((sum, game) => sum + Number(game.price), 0).toFixed(2);
}

export default calculateTotal;