export type CategoryIds =
    | 101
    | 102
    | 103
    | 104
    | 199
    | 200
    | 201
    | 202
    | 203
    | 204
    | 205
    | 206
    | 207
    | 208
    | 209
    | 299
    | 300
    | 301
    | 302
    | 303
    | 304
    | 305
    | 306
    | 399
    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | 406
    | 407
    | 408
    | 499
    | 600
    | 601
    | 602
    | 603
    | 604
    | 605
    | 699;

export const AUDIO = {
    DEFAULT: 100,
    MUSIC: 101,
    AUDIO_BOOKS: 102,
    SOUND_CLIPS: 103,
    FLAC: 104,
    OTHER: 199,
} as const;

export const VIDEO = {
    DEFAULT: 200,
    MOVIES: 201,
    MOVIES_DVDR: 202,
    HD_MOVIES: 207,
    MUSIC_VIDEOS: 203,
    MOVIE_CLIPS: 204,
    TV_SHOWS: 205,
    HD_TV_SHOWS: 208,
    HANDHELD: 206,
    "3D": 209,
    OTHER: 299,
} as const;

export const APPLICATION = {
    DEFAULT: 300,
    WINDOWS: 301,
    MAC: 302,
    UNIX: 303,
    HANDHELD: 304,
    IOS: 305,
    ANDROID: 306,
    OTHER: 399,
} as const;

export const GAMES = {
    DEFAULT: 400,
    PC: 401,
    MAC: 402,
    PSX: 403,
    XBOX360: 404,
    WII: 405,
    HANDHELD: 406,
    IOS: 407,
    ANDROID: 408,
    OTHER: 499,
} as const;

export const OTHER = {
    DEFAULT: 600,
    EBOOKS: 601,
    COMICS: 602,
    PICTURES: 603,
    COVERS: 604,
    PHYSIBLES: 605,
    OTHER: 699,
} as const;
