let Factory = (entity) => {
    let previousLeaderboard = Game.worlds[entity.world].leaderboard;

    entity.every(2000, () => {
        let different = false;
        let newLeaderboard = Game.worlds[entity.world].leaderboard;

        if (newLeaderboard.length !== previousLeaderboard.length) {
            different = true;
        } else {
            for (let l = newLeaderboard.length; l--;) {
                if (
                    newLeaderboard[l].id !== previousLeaderboard[l].id
                    || newLeaderboard[l].score !== previousLeaderboard[l].score
                ) {
                    different = true;
                    break;
                }
            }
        }

        if (different) {
            previousLeaderboard = newLeaderboard;
            entity.socket.emit('leaderboard', newLeaderboard);
        }
    });

    entity.socket.emit('leaderboard', previousLeaderboard);
};

module.exports = Factory;
