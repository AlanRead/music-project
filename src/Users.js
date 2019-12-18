function Users() {
    this.users = [];
}

/**
 * Checks if a username already exists
 */
Users.prototype.alreadyExists = function(name) {
    for(var i = 0; i < this.users.length; i ++) {
        if (this.users[i].username == name) {
            return true;
        }
    }
    return false;
}

/**
 * Adds the new user to the list of users
 */
Users.prototype.addUser = function(user) {
    this.users.push(user);
}

/**
 * Gets the user by their username
 */
Users.prototype.getUserByName = function(username) {
    for (var i = 0; i < this.users.length; i ++) {
        if(this.users[i].getUsername() == username) {
            return this.users[i];
        }
    }
    return null;
}

module.exports = Users;