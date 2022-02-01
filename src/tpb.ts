import axios from 'axios'
import RequestException from './exceptions/RequestExceptions';
import { CategoryIds, SearchPayload, SearchResults, TorrentDetails, TorrentResults } from './types';

export class TPB_Api {
    constructor() {
        axios.defaults.baseURL = 'https://apibay.org';
        axios.defaults.responseType = 'json';
    }

    /**
     * Search a torrent
     * 
     * @param SearchPayload 
     * @returns SearchResults
     */
    public async search(params: SearchPayload) {
        return this.request<SearchResults>('/q.php', params);
    }

    /**
     * Get torrent details
     * 
     * @param id 
     * @returns 
     */
    public async details(id: number) {
        return this.request<TorrentDetails>('/t.php', { id: id });
    }

    /**
     * Get top 100 torrents
     * 
     * @param category 
     * @returns TorrentResults
     */
    public async top100(category: CategoryIds | 'all' | 'recent') {
        return this.request<TorrentResults>(`/precompiled/data_top100_${category}.json`);
    }

    /**
     * Get last 100 added torrents
     * 
     * @returns TorrentResults
     */
    public async recent() {
        return await this.top100('recent');
    }

    /**
     * Get all torrents uploaded by user
     * 
     * @param username 
     * @param page 
     * @returns 
     */
    public async byUser(username: string, page = 0) {
        return this.request<SearchResults>('/q.php', { q: `user:${username}:${page}` });
    }

    /**
     * Change API base url
     * 
     * @param url 
     */
    public setBaseUrl(url: string) {
        axios.defaults.baseURL = url;
    }

    /**
     * Create a request
     * 
     * @param path      - e.g. `q.php`
     * @param params    - e.g. { q: 'lord of the rings', cat: 208 }
     * @returns 
     */
    public async request<T>(path: string, params?: object): Promise<T> {
        try {
            const request = await axios.get<T>(path, { params: params });

            return request.data;
        } catch(err) {
            if(axios.isAxiosError(err)) {
                throw new RequestException(err.message);
            }

            throw new Error('Something wen\'t');
        }
    }
}