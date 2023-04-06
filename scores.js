function showHighScores() {
    var highScores = JSON.parse(localStorage.getItem('highScores'));
    var scoresList = document.getElementById('highscores');

    // Sort the high scores by score (descending order)
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });

    // Create a list element for each high score and add it to the container element
    for (var i = 0; i < highScores.length; i++) {
        var scoreItem = document.createElement('li');
        scoreItem.textContent = highScores[i].initials + ': ' + highScores[i].score;
        scoresList.appendChild(scoreItem);
    }
}
function clear() {
    localStorage.removeItem('highScores');
    window.location.reload();
}
document.getElementById('clear').onclick = clear;

showHighScores();