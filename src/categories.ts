import { Categories } from "./types";

const CATEGORIES: Categories = {
    audio: {
        music: 101,
        audio_books: 102,
        sound_clips: 103,
        FLAC: 104,
        other: 199
    },
    video: {
        movies: 201,
        movies_dvdr: 202,
        hd_movies: 207,
        music_videos: 203,
        movie_clips: 204,
        tv_shows: 205,
        hd_tv_shows: 208,
        handheld: 206,
        '3d': 209,
        other: 299
    },
    application: {
        windows: 301,
        mac: 302,
        UNIX: 303,
        handheld: 304,
        IOS: 305,
        android: 306,
        other: 399
    },
    games: {
        PC: 401,
        mac: 402,
        psx: 403,
        xbox360: 404,
        wii: 405,
        handheld: 406,
        IOS: 407,
        android: 408,
        other: 499
    },
    other: {
        ebooks: 601,
        comics: 602,
        pictures: 603,
        covers: 604,
        physibles: 605,
        other: 699
    }
}

export { CATEGORIES };