export declare type CategoryIds = 101 | 102 | 103 | 104 | 199 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 209 | 299 | 301 | 302 | 303 | 304 | 305 | 306 | 399 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 499 | 601 | 602 | 603 | 604 | 605 | 699;
export interface Categories {
    audio: {
        music: 101;
        audio_books: 102;
        sound_clips: 103;
        FLAC: 104;
        other: 199;
    };
    video: {
        movies: 201;
        movies_dvdr: 202;
        music_videos: 203;
        movie_clips: 204;
        tv_shows: 205;
        handheld: 206;
        hd_movies: 207;
        hd_tv_shows: 208;
        '3d': 209;
        other: 299;
    };
    application: {
        windows: 301;
        mac: 302;
        UNIX: 303;
        handheld: 304;
        IOS: 305;
        android: 306;
        other: 399;
    };
    games: {
        PC: 401;
        mac: 402;
        psx: 403;
        xbox360: 404;
        wii: 405;
        handheld: 406;
        IOS: 407;
        android: 408;
        other: 499;
    };
    other: {
        ebooks: 601;
        comics: 602;
        pictures: 603;
        covers: 604;
        physibles: 605;
        other: 699;
    };
}
export interface SearchPayload {
    q: string;
    cat: CategoryIds;
}
export interface Torrent {
    id: number;
    name: string;
    info_hash: string;
    leechers: number;
    seeders: number;
    num_files: number;
    size: number;
    username: string;
    added: Date;
    status: string;
    category: CategoryIds;
    imdb: string;
}
export declare type SearchResults = Torrent[];
export declare type TorrentResults = Torrent[];
export interface TorrentDetails {
    id: number;
    category: number;
    status: string;
    name: string;
    num_files: number;
    size: number;
    seeders: number;
    leechers: number;
    username: string;
    added: number;
    descr: string;
    imdb: string | null;
    language: string | null;
    textLanguage: string | null;
    info_hash: string;
}
