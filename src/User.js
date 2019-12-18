function User (username, password, currentSongs) {
    this.username = username;
    this.password = password;
    this.currentSongs = currentSongs;
}

/**
 * Gets the users username
 */
User.prototype.getUsername = function () {
    return this.username;
}

/**
 * Gets the users password
 */
User.prototype.getPassword = function () {
    return this.password;
}

module.exports = User;