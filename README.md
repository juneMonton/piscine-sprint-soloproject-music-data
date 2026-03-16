# piscine-sprint-soloproject-music-data
#### By June Monton (@juneMonton)

## Link to the deployed website
https://piscine-sprint-june-music-data.netlify.app/

## Introduction
### User Story

As a music listener, I want to view my personal listening stats, including how many songs I've played and my most listened-to tracks, so that I can understand my music taste and reflect on my listening habits over time.


## Set up
To install `jest`:
```
npm install jest
```
To install `http-server`:
```
npm install http-server
```

## Rubric
- [x] TThe website must contain a drop-down which lists four users.
- [x] Selecting a user must display answers relevant to that user 
- [x] Unit tests must be written for at least one non-trivial function.
- [x] The website must score 100 for accessibility in Lighthouse
- [x] The code written to calculate the answers to the questions must seem like it could handle different data if it were supplied, including the following edge-cases:
  - [x] User 4 has no data, so no questions apply to the user. Some intelligible statement should be shown to the user (e.g. "This user didn't listen to any songs.").
  - [x] If a question doesn't apply (e.g. if no songs were ever listened to on a Friday night), the interface should completely hide the question and answer. Displaying the question and an empty result, or any kind of error, is not acceptable.
  - [x] If fewer than three (but more than zero) genres were listened to, the site should list the top genres listened to. It must not display text like "Top 3 genres", but may say "Top genres," or "Top 2 genres," or similar.

