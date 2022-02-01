# Thepiratebay API wrapper

[![TypeScript version][ts-badge]][typescript-4-5]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]

This is an unofficial wrapper for the apibay.org API, which is used by thepiratebay.org.
I have added most, if not all, the features this API offers.

The API has some limitations. One of which is, there is no pagination trough search results. Perhaps they add that in the future. If so, I will add this feature in the module aswell.

## Documentation
    import TPBApi, { CATEGORIES } from 'tpbapi.org'
    
    // Incase the API url changes, which could happen knowing thepiratebay, 
    // you can manualy override the base url using this method
    TPBApi.setBaseUrl('https://newapiurl.org')

	TBPApi.search( {
        q: 'lord of the rings',
        cat: CATEGORIES.video.hd_movies // or 207
    } )

    // Returns top 100 based on category
    TPBApi.top100(CATEGORIES.video.hd_tv_shows)

    // Returns last 100 added torrents
    TPBApi.recent()

    // Returns torrent details
    TPBApi.details(17175721)

    // Returns all torrents uploaded by given user (This method supports paging!)
    TPBApi.byUser('yify', 1)

[ts-badge]: https://img.shields.io/badge/TypeScript-4.5-blue.svg
[typescript-4-5]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2016.13-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v16.x/docs/api/
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/redbullzuiper/apibay/blob/master/LICENSE