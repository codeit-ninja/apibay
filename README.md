# node-typescript-boilerplate

[![TypeScript version][ts-badge]][typescript-4-5]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]

# Thepiratebay API wrapper

This is an unofficial wrapper for the apibay.org API, which is used by thepiratebay.org.
I have added most, if not all, the features this API offers.

The API has some limitations. One of which is, there is no pagination trough search results. Perhaps they add that in the future. If so, I will add this feature in the module aswell.

## Documentation
    import TPBApi, { CATEGORIES } from 'tpbapi.org'
    
    // Incase the API url changes, which could happen knowing thepiratebay, you can manualy override the base url using this method
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