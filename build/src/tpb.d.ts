import { CategoryIds, SearchPayload, SearchResults, TorrentDetails, TorrentResults } from './types';
export declare class TPB_Api {
    constructor();
    search(params: SearchPayload): Promise<SearchResults>;
    details(id: number): Promise<TorrentDetails>;
    top100(category: CategoryIds | 'all' | 'recent'): Promise<TorrentResults>;
    recent(): Promise<TorrentResults>;
    byUser(username: string, page?: number): Promise<SearchResults>;
    setBaseUrl(url: string): void;
    request<T>(path: string, params?: object): Promise<T>;
}
