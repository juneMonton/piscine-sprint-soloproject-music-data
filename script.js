import { getUserIDs, getListenEvents, getSong } from "./data.js";
import {
    getMostListenedSong,
    getMostListenedArtist,
    getMostListenedOnFridayNight,
    getMostListenedByTime,
    getMostListenedInARow,
    getSongsListenedEveryDay,
    getTopGenres,
} from "./helpers.js";

const userSelect = document.getElementById("user-select");
const answersContainer = document.getElementById("answers-container");

function populateDropdown() {
    const userIDs = getUserIDs();
    userIDs.forEach((id) => {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = `User ${id}`;
        userSelect.append(option);
    });
}

function createAnswerBlock(question, answer) {
    const block = document.createElement("div");

    const q = document.createElement("h2");
    q.textContent = question;

    const a = document.createElement("p");
    a.textContent = answer;

    block.append(q, a);
    answersContainer.append(block);
}

function render(userID) {
    answersContainer.innerHTML = "";

    const listenEvents = getListenEvents(userID);

    if (listenEvents.length === 0) {
        const message = document.createElement("p");
        message.textContent = "This user didn't listen to any songs.";
        answersContainer.append(message);
        return;
    }

    const mostSong = getMostListenedSong(listenEvents, getSong);
    if (mostSong) {
        createAnswerBlock("Most listened song", mostSong);
    }

    const mostArtist = getMostListenedArtist(listenEvents, getSong);
    if (mostArtist) {
        createAnswerBlock("Most listened artist", mostArtist);
    }

    const fridaySong = getMostListenedOnFridayNight(listenEvents, getSong);
    if (fridaySong) {
        createAnswerBlock("Most listened song on Friday nights", fridaySong);
    }

    const byTime = getMostListenedByTime(listenEvents, getSong);
    if (byTime) {
        createAnswerBlock("Most listened song by listening time", byTime.song);
        createAnswerBlock("Most listened artist by listening time", byTime.artist);
    }

    const inARow = getMostListenedInARow(listenEvents, getSong);
    if (inARow) {
        createAnswerBlock(
            "Most listened song in a row",
            `${inARow.title} — listened ${inARow.count} times in a row!`
        );
    }

    const everyDay = getSongsListenedEveryDay(listenEvents, getSong);
    if (everyDay && everyDay.length > 0) {
        createAnswerBlock("Songs listened every day", everyDay.join(", "));
    }

    const topGenres = getTopGenres(listenEvents, getSong);
    if (topGenres && topGenres.length > 0) {
        createAnswerBlock(
            `Top ${topGenres.length > 1 ? topGenres.length + " genres" : "genre"}`,
            topGenres.join(", ")
        );
    }
}

userSelect.addEventListener("change", function () {
    if (userSelect.value) {
        render(userSelect.value);
    }
});

populateDropdown();