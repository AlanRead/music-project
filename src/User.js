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

/**
 * Gets the songs object associated with this user
 */
User.prototype.getSongs = function () {
    return this.currentSongs;
}

/**
 * Adds the name as the key
 * Adds the sheet as the value
 * @param {} name Name of the song
 * @param {} sheet The actual music the user wrote
 */
User.prototype.addSong = function (name, sheet) {
    this.currentSongs.addNameAndSong(name, sheet);
}

module.exports = User;