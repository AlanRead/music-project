function Users() {
    this.users = [];
}

/**
 * Checks if a username already exists
 */
Usernames.prototype.alreadyExists = function(name) {
    for(var i = 0; i < this.users.length; i ++) {
        if (this.users[i].username == name) {
            return false;
        }
    }
    return true;
}

/**
 * Adds the user to the list of users
 */
Usernames.prototype.addUser = function(user) {
    this.users.push(user);
}