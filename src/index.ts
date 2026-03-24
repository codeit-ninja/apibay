import { APIBay, type createApibayOptions, type SearchPayload } from "./apibay";
import {
    type CategoryIds,
    APPLICATION,
    AUDIO,
    GAMES,
    OTHER,
    VIDEO,
} from "./categories";
import {
    type Torrent,
    type TorrentDetails,
    torrent,
    torrentDetails,
} from "./schema";

const createApiBay = (options?: createApibayOptions) => {
    return new APIBay(options);
};

export {
    APIBay,
    createApiBay,
    APPLICATION,
    AUDIO,
    GAMES,
    OTHER,
    VIDEO,
    torrent,
    torrentDetails,
    type CategoryIds,
    type Torrent,
    type TorrentDetails,
    type SearchPayload,
};
