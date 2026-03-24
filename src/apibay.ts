import type { CategoryIds } from "./categories";
import {
    torrent,
    torrentDetails,
    type Torrent,
    type TorrentDetails,
} from "./schema";
import type { z } from "zod";

export type createApibayOptions = {
    baseUrl?: string;
    transform?: boolean;
};

export type SearchPayload = {
    q: string;
    cat?: CategoryIds;
};

export class APIBay {
    private baseUrl?: string = "https://apibay.org";
    private transform?: boolean;
    /**
     * Create a new instance of the APIBay class with optional configuration.
     *
     * @param options An optional object containing configuration options for the APIBay instance.
     *  - `baseUrl`: A custom base URL for the API (default is "https://apibay.org").
     *  - `transform`: A boolean indicating whether to validate and transform API responses using Zod schemas (default is false).
     */
    constructor(options?: createApibayOptions) {
        if (options?.baseUrl) {
            this.baseUrl = options.baseUrl;
        }

        if (options?.transform) {
            this.transform = options.transform;
        }
    }
    /**
     * Get the current base URL used for API requests.
     * This is the URL that the API wrapper will send requests to when fetching data from apibay.org.
     *
     * @returns The current base URL as a string.
     * @default "https://apibay.org"
     */
    public getBaseUrl() {
        return this.baseUrl;
    }
    /**
     * Set a custom base URL for the API. Useful if you want to use a proxy or mirror of apibay.org.
     *
     * Note: The default base URL is "https://apibay.org".
     *
     * @param baseUrl The new base URL to use for API requests.
     */
    public setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    /**
     * Get the top 100 torrents for a specific category.
     *
     * @param category The category to fetch top 100 torrents for. Can be a specific category ID, "all" for all categories, or "recent" for recently added torrents.
     * @returns A promise that resolves to an array of Torrent objects.
     */
    public async getTop100(
        category: CategoryIds | "all" | "recent",
    ): Promise<Torrent[]> {
        const response = await this.request<Torrent[]>(
            `/precompiled/data_top100_${category}.json`,
        );

        if (this.transform) {
            return this.validate(torrent.array(), response);
        }

        return response;
    }
    /**
     * Get the top 100 recently added torrents.
     *
     * @returns A promise that resolves to an array of Torrent objects representing the most recently added torrents.
     */
    public getRecent() {
        return this.getTop100("recent");
    }
    /**
     * Get detailed information about a specific torrent by its ID.
     *
     * @param id The ID of the torrent to fetch details for.
     * @returns A promise that resolves to a TorrentDetails object containing detailed information about the specified torrent.
     */
    public async getDetails(id: number): Promise<TorrentDetails> {
        const response = await this.request<TorrentDetails>(`t.php`, { id });

        if (this.transform) {
            return this.validate(torrentDetails, response);
        }

        return response;
    }
    /**
     * Get torrents uploaded by a specific user, with optional pagination.
     *
     * @param username The username of the uploader whose torrents you want to fetch.
     * @param page The page number for pagination (default is 0). Each page contains a set number of torrents.
     * @returns A promise that resolves to an array of Torrent objects uploaded by the specified user.
     */
    public async getByUser(username: string, page = 0) {
        const response = await this.request<Torrent[]>(`q.php`, {
            q: `user:${username}:${page}`,
        });

        if (this.transform) {
            return this.validate(torrent.array(), response);
        }

        return response;
    }
    /**
     * Search for torrents based on a query string and optional category filter.
     *
     * @param payload An object containing the search query and optional category filter.
     *  The `q` property is the search query string, and the `cat` property is an optional category ID to filter results by.
     * @returns A promise that resolves to an array of Torrent objects matching the search criteria.
     */
    public async search(payload: SearchPayload) {
        const response = await this.request<Torrent[]>(`q.php`, payload);

        if (this.transform) {
            return this.validate(torrent.array(), response);
        }

        return response;
    }
    /**
     * Make a request to the API with the specified endpoint and query parameters.
     * This method handles constructing the full URL, making the HTTP request, and parsing the JSON response.
     * It also includes error handling for network issues and non-OK HTTP responses.
     *
     * @param endpoint The API endpoint to request (e.g., "/precompiled/data_top100_all.json").
     * @param params An optional object containing query parameters to include in the request URL.
     * @returns A promise that resolves to the parsed JSON response from the API, typed as T.
     */
    async request<T>(
        endpoint: string,
        params?: Record<string, any>,
    ): Promise<T> {
        try {
            const url = new URL(endpoint, this.baseUrl);
            if (params) {
                Object.keys(params).forEach((key) =>
                    url.searchParams.append(key, params[key]),
                );
            }

            const response = await fetch(url.toString(), {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return (await response.json()) as T;
        } catch (e) {
            console.error("Error fetching data:", e);
            throw e;
        }
    }
    /**
     * Validate the received data against a Zod schema.
     * If the data does not match the expected format, an error is thrown with details about the validation failure.
     *
     * @param schema The Zod schema to validate the data against.
     * @param data The data to validate.
     * @returns The validated data, typed as the inferred type of the provided Zod schema.
     */
    private validate<T extends z.ZodTypeAny>(
        schema: T,
        data: unknown,
    ): z.infer<T> {
        const result = schema.safeParse(data);
        if (!result.success) {
            console.error("Data validation error:", result.error);
            throw new Error("Received data does not match expected format");
        }

        return result.data;
    }
}
