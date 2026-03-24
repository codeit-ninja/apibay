import { z } from "zod";

export const torrent = z.object({
    id: z.coerce.number(),
    name: z.string(),
    info_hash: z.string(),
    leechers: z.coerce.number(),
    seeders: z.coerce.number(),
    num_files: z.coerce.number(),
    size: z.coerce.number(),
    username: z.string(),
    added: z.coerce.number().transform((n) => new Date(n * 1000)),
    status: z.string(),
    category: z.coerce.number(),
    imdb: z
        .string()
        .nullable()
        .transform((val) => (val === "" || val === null ? null : val))
        .refine((val) => val === null || /^tt\d{7,8}$/.test(val), {
            message: "Invalid IMDb ID format",
        }),
});

export const torrentDetails = z.object({
    id: z.coerce.number(),
    category: z.coerce.number(),
    status: z.string(),
    name: z.string(),
    num_files: z.coerce.number(),
    size: z.coerce.number(),
    seeders: z.coerce.number(),
    leechers: z.coerce.number(),
    username: z.string(),
    added: z.coerce.number().transform((n) => new Date(n * 1000)),
    descr: z.string(),
    imdb: z
        .string()
        .nullable()
        .transform((val) => (val === "" || val === null ? null : val))
        .refine((val) => val === null || /^tt\d{7,8}$/.test(val), {
            message: "Invalid IMDb ID format",
        }),
    language: z.string().nullable().optional(),
    textLanguage: z.string().nullable().optional(),
    info_hash: z.string(),
});

export type Torrent = z.infer<typeof torrent>;
export type TorrentDetails = z.infer<typeof torrentDetails>;
