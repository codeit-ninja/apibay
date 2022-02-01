// import { AxiosResponse } from "axios";
// import { TorrentResults } from "./types";

// export function transformResponse(response: AxiosResponse<TorrentResults>) {
//     if(response.config.url === '/q.php') {
//         if(response.data[0].name === 'No results returned') response.data = [];

//         response.data = response.data.map(torrent => {
//             return {
//                 id: parseInt(torrent.id),
//                 name: torrent.name,
//                 info_hash: torrent.info_hash,
//                 leechers: parseInt(torrent.leechers),
//                 seeders: parseInt(torrent.seeders),
//                 num_files: parseInt(torrent.num_files),
//                 username: torrent.username,
//                 added: new Date(parseInt(torrent.added) * 1000),
//                 status: torrent.status,
//                 category: parseInt(torrent.category),
//                 imdb: torrent.imdb,
//             }
//         });
//     }

//     if(response.config.url === '/t.php') {
//         if(response.data.name === 'Torrent does not exsist.') {
//             response.data = {}
//         } 
//         else {
//             response.data.added = new Date(response.data.added * 1000)
//         }
//     }

//     return response;
// }