function countOccurrences(items) {
    const counts = {};
    items.forEach((item) => {
        counts[item] = (counts[item] || 0) + 1;
    });
    return counts;
}

function getHighestCount(counts) {
    let highest = null;
    let highestCount = 0;
    for (const key in counts) {
        if (counts[key] > highestCount) {
            highest = key;
            highestCount = counts[key];
        }
    }
    return highest;
}

export function getMostListenedSong(listenEvents, getSong) {
    const songIDs = listenEvents.map((event) => event.song_id);
    const counts = countOccurrences(songIDs);
    const topSongID = getHighestCount(counts);
    if (!topSongID) return null;
    return getSong(topSongID).title;
}

export function getMostListenedArtist(listenEvents, getSong) {
    const artists = listenEvents.map((event) => getSong(event.song_id).artist);
    const counts = countOccurrences(artists);
    return getHighestCount(counts);
}

export function getMostListenedOnFridayNight(listenEvents, getSong) {
    const fridayNightEvents = listenEvents.filter((event) => {
        const date = new Date(event.timestamp);
        const day = date.getDay();
        const seconds = event.seconds_since_midnight;
        const isFridayAfter5pm = day === 5 && seconds >= 61200;
        const isSaturdayBefore4am = day === 6 && seconds < 14400;
        return isFridayAfter5pm || isSaturdayBefore4am;
    });

    if (fridayNightEvents.length === 0) return null;

    const songIDs = fridayNightEvents.map((event) => event.song_id);
    const counts = countOccurrences(songIDs);
    const topSongID = getHighestCount(counts);
    if (!topSongID) return null;
    return getSong(topSongID).title;
}

export function getMostListenedByTime(listenEvents, getSong) {
    const songSeconds = {};
    const artistSeconds = {};

    listenEvents.forEach((event) => {
        const song = getSong(event.song_id);
        const duration = song.duration_seconds;
        songSeconds[song.title] = (songSeconds[song.title] || 0) + duration;
        artistSeconds[song.artist] = (artistSeconds[song.artist] || 0) + duration;
    });

    const topSong = getHighestCount(songSeconds);
    const topArtist = getHighestCount(artistSeconds);
    if (!topSong || !topArtist) return null;
    return { song: topSong, artist: topArtist };
}

export function getMostListenedInARow(listenEvents, getSong) {
    if (listenEvents.length === 0) return null;

    let bestSongID = null;
    let bestCount = 1;
    let currentSongID = listenEvents[0].song_id;
    let currentCount = 1;

    for (let i = 1; i < listenEvents.length; i++) {
        if (listenEvents[i].song_id === currentSongID) {
            currentCount++;
        } else {
            if (currentCount > bestCount) {
                bestCount = currentCount;
                bestSongID = currentSongID;
            }
            currentSongID = listenEvents[i].song_id;
            currentCount = 1;
        }
    }

    if (currentCount > bestCount) {
        bestCount = currentCount;
        bestSongID = currentSongID;
    }

    if (!bestSongID || bestCount < 2) return null;
    return { title: getSong(bestSongID).title, count: bestCount };
}

export function getSongsListenedEveryDay(listenEvents, getSong) {
    if (listenEvents.length === 0) return null;

    const days = new Set(
        listenEvents.map((event) => event.timestamp.split("T")[0])
    );
    const totalDays = days.size;

    const songDays = {};
    listenEvents.forEach((event) => {
        const day = event.timestamp.split("T")[0];
        const songID = event.song_id;
        if (!songDays[songID]) {
            songDays[songID] = new Set();
        }
        songDays[songID].add(day);
    });

    const everyDaySongs = [];
    for (const songID in songDays) {
        if (songDays[songID].size === totalDays) {
            everyDaySongs.push(getSong(songID).title);
        }
    }

    return everyDaySongs.length > 0 ? everyDaySongs : null;
}

export function getTopGenres(listenEvents, getSong) {
    const genres = listenEvents.map((event) => getSong(event.song_id).genre);
    const counts = countOccurrences(genres);
    const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    return sorted.slice(0, 3);
}