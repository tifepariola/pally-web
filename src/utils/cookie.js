import cookie from 'react-cookies';

const KEYS  = {
    AUTH: 'pally_session',
    USER: 'pally_user'
}

const rules = {
    sameSite: 'strict'
}

export default class Cookie {
    static cookie = {}

    static _extractFromDocument () {
        var cookies = {}
        document.cookie.split(';').forEach(item => {
            let cookieArray = item.split('=')
            if (cookieArray[0].trim().startsWith('pally')) {
                try {
                    cookies[cookieArray[0].trim()] = JSON.parse(
                        decodeURIComponent(cookieArray[1])
                    )
                } catch {
                    cookies[cookieArray[0].trim()] = decodeURIComponent(cookieArray[1])
                }
            }
        })
        return cookies
    }

    static load () {
        console.log('Loading cookies ... ')
        Cookie.cookie = Cookie._extractFromDocument()
    }

    static getAll () {
        cookie.loadAll()
    }

    static setUser (user) {
        cookie.save(KEYS.USER, user)
        Cookie._updateCookieInternal()
    }
    
    static getUser () {
        // cookie.load(KEYS.USER)
        return Cookie.cookie[KEYS.USER]
    }

    static deleteUser () {
        cookie.remove(KEYS.USER)
    }

    static setAuth (token) {
        cookie.save(KEYS.AUTH, token)
        Cookie._updateCookieInternal()
    }

    static getAuth () {
        // cookie.load(KEYS.AUTH)
        return Cookie.cookie[KEYS.AUTH]
    }

    static deleteAuth () {
        cookie.remove(KEYS.AUTH)
    }

    static _updateCookieInternal () {
        Cookie.cookie = this._extractFromDocument()
    }
}
