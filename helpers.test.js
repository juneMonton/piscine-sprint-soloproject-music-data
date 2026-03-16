import {
    getMostListenedSong,
    getMostListenedArtist,
    getTopGenres,
} from "./helpers.js";

const mockListenEvents = [
    { song_id: "song-1", timestamp: "2024-08-01T18:00:00", seconds_since_midnight: 64800 },
    { song_id: "song-1", timestamp: "2024-08-02T18:00:00", seconds_since_midnight: 64800 },
    { song_id: "song-2", timestamp: "2024-08-03T18:00:00", seconds_since_midnight: 64800 },
];

const mockGetSong = (songID) => {
    const songs = {
        "song-1": { title: "I Got Love", artist: "The King Blues", genre: "Punk", duration_seconds: 190 },
        "song-2": { title: "Be More Kind", artist: "Frank Turner", genre: "Pop", duration_seconds: 247 },
    };
    return songs[songID];
};

test("getMostListenedSong returns the most played song", function () {
    const result = getMostListenedSong(mockListenEvents, mockGetSong);
    expect(result).toBe("I Got Love");
});

test("getMostListenedArtist returns the most played artist", function () {
    const result = getMostListenedArtist(mockListenEvents, mockGetSong);
    expect(result).toBe("The King Blues");
});

test("getTopGenres returns genres sorted by count", function () {
    const result = getTopGenres(mockListenEvents, mockGetSong);
    expect(result[0]).toBe("Punk");
});