import { beforeEach, describe, expect, it, vi } from "vitest";
import { APIBay } from "../src/apibay";

const mockTorrent = {
    id: "81513377",
    name: "Avatar.Fire.and.Ash.2025.1080p.TS.EN-RGB",
    info_hash: "927BEC221ECE5E95E55FA6BE735230324110832F",
    leechers: "470",
    seeders: "1938",
    size: "7907661668",
    num_files: "2",
    username: "LegendET",
    added: "1766038273",
    status: "vip",
    category: "207",
    imdb: "tt1757678",
};

const mockTorrentDetails = {
    id: 81513377,
    category: 207,
    status: "vip",
    name: "Avatar.Fire.and.Ash.2025.1080p.TS.EN-RGB",
    num_files: 2,
    size: 7907661668,
    seeders: 1958,
    leechers: 358,
    username: "LegendET",
    added: 1766038273,
    descr: "\r\nGeneral\r\nComplete name : D:\\Avatar.Fire.and.Ash.2025.1080p.TS.EN-RGB\\Avatar.Fire.and.Ash.2025.1080p.TS.EN-RGB.mp4\r\nFormat : MPEG-4\r\nFormat profile : Base Media\r\nCodec ID : isom (isom/iso2/avc1/mp41)\r\nFile size : 7.36 GiB\r\nDuration : 3 h 10 min\r\nOverall bit rate : 5 536 kb/s\r\nFrame rate : 24.000 FPS\r\nEncoded date : 2025-12-17 23:40:47 UTC\r\nTagged date : 2025-12-17 23:40:47 UTC\r\nWriting application : XviD4PSP 8.1.103\r\nHDVideo : Yes\r\n\r\nVideo\r\nID : 1\r\nFormat : AVC\r\nFormat/Info : Advanced Video Codec\r\nFormat profile : High@L4.1\r\nFormat settings : CABAC / 4 Ref Frames\r\nFormat settings, CABAC : Yes\r\nFormat settings, Reference frames : 4 frames\r\nCodec ID : avc1\r\nCodec ID/Info : Advanced Video Coding\r\nDuration : 3 h 10 min\r\nBit rate : 5 337 kb/s\r\nMaximum bit rate : 50.0 Mb/s\r\nWidth : 1 920 pixels\r\nHeight : 836 pixels\r\nDisplay aspect ratio : 2.25:1\r\nFrame rate mode : Constant\r\nFrame rate : 24.000 FPS\r\nColor space : YUV\r\nChroma subsampling : 4:2:0\r\nBit depth : 8 bits\r\nScan type : Progressive\r\nBits/(Pixel*Frame) : 0.139\r\nStream size : 7.10 GiB (96%)\r\nWriting library : x264 core 164 r3193 3a8b5be\r\nEncoding settings : cabac=1 / ref=4 / deblock=1:-2:-2 / analyse=0x3:0x113 / me=hex / subme=6 / psy=1 / psy_rd=1.00:0.00 / mixed_ref=1 / me_range=16 / chroma_me=1 / trellis=2 / 8x8dct=1 / cqm=0 / deadzone=21,11 / fast_pskip=0 / chroma_qp_offset=-2 / threads=32 / lookahead_threads=6 / sliced_threads=0 / nr=0 / decimate=0 / interlaced=0 / bluray_compat=0 / constrained_intra=0 / bframes=4 / b_pyramid=2 / b_adapt=2 / b_bias=0 / direct=3 / weightb=1 / open_gop=0 / weightp=2 / keyint=240 / keyint_min=24 / scenecut=40 / intra_refresh=0 / rc_lookahead=60 / rc=crf / mbtree=0 / crf=25.5 / qcomp=0.60 / qpmin=0 / qpmax=69 / qpstep=4 / vbv_maxrate=50000 / vbv_bufsize=62500 / crf_max=0.0 / nal_hrd=none / filler=0 / ip_ratio=1.40 / pb_ratio=1.30 / aq=1:0.80\r\nEncoded date : 2025-12-17 23:40:47 UTC\r\nTagged date : 2025-12-17 23:40:47 UTC\r\nColor range : Limited\r\nColor primaries : BT.709\r\nTransfer characteristics : BT.709\r\nMatrix coefficients : BT.709\r\nCodec configuration box : avcC\r\n\r\nAudio\r\nID : 2\r\nFormat : AAC LC\r\nFormat/Info : Advanced Audio Codec Low Complexity\r\nCodec ID : mp4a-40-2\r\nDuration : 3 h 10 min\r\nBit rate mode : Constant\r\nBit rate : 192 kb/s\r\nChannel(s) : 2 channels\r\nChannel layout : L R\r\nSampling rate : 48.0 kHz\r\nFrame rate : 46.875 FPS (1024 SPF)\r\nCompression mode : Lossy\r\nStream size : 262 MiB (3%)\r\nDefault : Yes\r\nAlternate group : 1\r\nEncoded date : 2025-12-17 23:40:47 UTC\r\nTagged date : 2025-12-17 23:40:47 UTC\r\n\r\nhttps://i.ibb.co/fG2p8Sb5/vlcsnap-2025-12-18-10h03m23s681.png\r\nhttps://i.ibb.co/ym19dHHy/vlcsnap-2025-12-18-10h03m49s655.png\r\nhttps://i.ibb.co/b5t1394k/vlcsnap-2025-12-18-10h04m21s391.png\r\nhttps://i.ibb.co/Tx1zw9tF/vlcsnap-2025-12-18-10h08m43s378.png",
    imdb: "tt1757678",
    language: 1,
    textlanguage: null,
    info_hash: "927BEC221ECE5E95E55FA6BE735230324110832F",
};

const makeFetch = (data: unknown, ok = true, status = 200) =>
    vi.fn().mockResolvedValue({
        ok,
        status,
        json: vi.fn().mockResolvedValue(data),
    });

describe("APIBay", () => {
    beforeEach(() => {
        vi.unstubAllGlobals();
    });

    describe("constructor", () => {
        it("uses default baseUrl when no options provided", () => {
            const api = new APIBay();
            expect(api.getBaseUrl()).toBe("https://apibay.org");
        });

        it("uses custom baseUrl when provided", () => {
            const api = new APIBay({ baseUrl: "https://custom.example.com" });
            expect(api.getBaseUrl()).toBe("https://custom.example.com");
        });

        it("keeps default baseUrl when options has no baseUrl", () => {
            const api = new APIBay({ transform: true });
            expect(api.getBaseUrl()).toBe("https://apibay.org");
        });
    });

    describe("getBaseUrl / setBaseUrl", () => {
        it("returns the current baseUrl", () => {
            const api = new APIBay();
            expect(api.getBaseUrl()).toBe("https://apibay.org");
        });

        it("updates the baseUrl via setBaseUrl", () => {
            const api = new APIBay();
            api.setBaseUrl("https://mirror.example.com");
            expect(api.getBaseUrl()).toBe("https://mirror.example.com");
        });
    });

    describe("getTop100", () => {
        it("returns raw response without transform", async () => {
            const mockData = [mockTorrent];
            vi.stubGlobal("fetch", makeFetch(mockData));

            const api = new APIBay();
            const result = await api.getTop100("all");

            expect(result).toEqual(mockData);
        });

        it("fetches correct URL for category", async () => {
            const fetchMock = makeFetch([mockTorrent]);
            vi.stubGlobal("fetch", fetchMock);

            const api = new APIBay();
            await api.getTop100(200);

            expect(fetchMock).toHaveBeenCalledWith(
                "https://apibay.org/precompiled/data_top100_200.json",
                expect.any(Object),
            );
        });

        it("returns validated and transformed data with transform enabled", async () => {
            vi.stubGlobal("fetch", makeFetch([mockTorrent]));

            const api = new APIBay({ transform: true });
            const result = await api.getTop100("all");

            expect(result[0].id).toBe(81513377);
            expect(result[0].added).toBeInstanceOf(Date);
            expect(result[0].seeders).toBe(1938);
        });

        it("throws when transform is enabled and data is invalid", async () => {
            vi.stubGlobal("fetch", makeFetch([{ id: "bad" }]));

            const api = new APIBay({ transform: true });
            await expect(api.getTop100("all")).rejects.toThrow(
                "Received data does not match expected format",
            );
        });
    });

    describe("getRecent", () => {
        it("calls getTop100 with 'recent'", async () => {
            const fetchMock = makeFetch([mockTorrent]);
            vi.stubGlobal("fetch", fetchMock);

            const api = new APIBay();
            await api.getRecent();

            expect(fetchMock).toHaveBeenCalledWith(
                "https://apibay.org/precompiled/data_top100_recent.json",
                expect.any(Object),
            );
        });
    });

    describe("getDetails", () => {
        it("returns raw response without transform", async () => {
            vi.stubGlobal("fetch", makeFetch(mockTorrentDetails));

            const api = new APIBay();
            const result = await api.getDetails(1);

            expect(result).toEqual(mockTorrentDetails);
        });

        it("fetches correct URL with id param", async () => {
            const fetchMock = makeFetch(mockTorrentDetails);
            vi.stubGlobal("fetch", fetchMock);

            const api = new APIBay();
            await api.getDetails(78885173);

            expect(fetchMock).toHaveBeenCalledWith(
                "https://apibay.org/t.php?id=78885173",
                expect.any(Object),
            );
        });

        it("returns validated and transformed data with transform enabled", async () => {
            vi.stubGlobal("fetch", makeFetch(mockTorrentDetails));

            const api = new APIBay({ transform: true });
            const result = await api.getDetails(1);

            expect(result.id).toBe(81513377);
            expect(result.added).toBeInstanceOf(Date);
            expect(result.imdb).toBe("tt1757678");
        });

        it("transforms empty imdb string to null with transform enabled", async () => {
            vi.stubGlobal(
                "fetch",
                makeFetch({ ...mockTorrentDetails, imdb: "" }),
            );

            const api = new APIBay({ transform: true });
            const result = await api.getDetails(1);

            expect(result.imdb).toBeNull();
        });
    });

    describe("getByUser", () => {
        it("fetches correct URL with username and default page", async () => {
            const fetchMock = makeFetch([mockTorrent]);
            vi.stubGlobal("fetch", fetchMock);

            const api = new APIBay();
            await api.getByUser("testuser");

            expect(fetchMock).toHaveBeenCalledWith(
                "https://apibay.org/q.php?q=user%3Atestuser%3A0",
                expect.any(Object),
            );
        });

        it("fetches correct URL with username and custom page", async () => {
            const fetchMock = makeFetch([mockTorrent]);
            vi.stubGlobal("fetch", fetchMock);

            const api = new APIBay();
            await api.getByUser("testuser", 2);

            expect(fetchMock).toHaveBeenCalledWith(
                "https://apibay.org/q.php?q=user%3Atestuser%3A2",
                expect.any(Object),
            );
        });

        it("returns validated data with transform enabled", async () => {
            vi.stubGlobal("fetch", makeFetch([mockTorrent]));

            const api = new APIBay({ transform: true });
            const result = await api.getByUser("testuser");

            expect(result[0].id).toBe(81513377);
            expect(result[0].added).toBeInstanceOf(Date);
        });
    });

    describe("search", () => {
        it("fetches correct URL with query", async () => {
            const fetchMock = makeFetch([mockTorrent]);
            vi.stubGlobal("fetch", fetchMock);

            const api = new APIBay();
            await api.search({ q: "ubuntu" });

            expect(fetchMock).toHaveBeenCalledWith(
                "https://apibay.org/q.php?q=ubuntu",
                expect.any(Object),
            );
        });

        it("fetches correct URL with query and category", async () => {
            const fetchMock = makeFetch([mockTorrent]);
            vi.stubGlobal("fetch", fetchMock);

            const api = new APIBay();
            await api.search({ q: "ubuntu", cat: 300 });

            expect(fetchMock).toHaveBeenCalledWith(
                "https://apibay.org/q.php?q=ubuntu&cat=300",
                expect.any(Object),
            );
        });

        it("returns validated data with transform enabled", async () => {
            vi.stubGlobal("fetch", makeFetch([mockTorrent]));

            const api = new APIBay({ transform: true });
            const result = await api.search({ q: "ubuntu" });

            expect(result[0].name).toBe(
                "Avatar.Fire.and.Ash.2025.1080p.TS.EN-RGB",
            );
            expect(result[0].added).toBeInstanceOf(Date);
        });
    });

    describe("request error handling", () => {
        it("throws on non-ok HTTP response", async () => {
            vi.stubGlobal("fetch", makeFetch({}, false, 404));

            const api = new APIBay();
            await expect(api.getTop100("all")).rejects.toThrow(
                "HTTP error! status: 404",
            );
        });

        it("throws on 429 Too Many Requests", async () => {
            vi.stubGlobal("fetch", makeFetch({}, false, 429));

            const api = new APIBay();
            await expect(api.getTop100("all")).rejects.toThrow(
                "HTTP error! status: 429",
            );
        });

        it("throws on network error", async () => {
            vi.stubGlobal(
                "fetch",
                vi.fn().mockRejectedValue(new Error("Network failure")),
            );

            const api = new APIBay();
            await expect(api.getTop100("all")).rejects.toThrow(
                "Network failure",
            );
        });

        it("sends User-Agent header with every request", async () => {
            const fetchMock = makeFetch([mockTorrent]);
            vi.stubGlobal("fetch", fetchMock);

            const api = new APIBay();
            await api.getTop100("all");

            expect(fetchMock).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        "User-Agent": expect.stringContaining("Mozilla"),
                    }),
                }),
            );
        });
    });
});
