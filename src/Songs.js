function Songs(){
    //dictionary format - song name: sheetmusic
    this.songs = {};
}

/**
 * Gets the sheet music based on the song name
 * @param {} song The song name
 */
function getSheetFromSong (song) {
    return this.songs[song];
}

/**
 * Adds the name as the key
 * Adds the sheet as the value
 * @param {} name Name of the song
 * @param {} sheet The actual music the user wrote
 */
function addNameAndSong (name, sheet) {
    this.songs[name] = sheet;
}

module.exports = Songs;
