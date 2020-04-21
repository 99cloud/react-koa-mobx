/** A global class for authorization check. */
import { isEmpty } from 'lodash'

export default class GlobalValue {
  constructor() {
    // local cache
    this._cache_ = {}
  }

  get enableGlobalNav() {
    const navs = this.getGlobalNavs()
    return navs.length > 0
  }

  getGlobalNavs() {
    if (!this._cache_['globalNavs']) {
      const navs = []

      globals.config.globalNavs.forEach(nav => {
        const filteredItems = nav

        if (!isEmpty(filteredItems)) {
          navs.push({ ...nav })
        }
      })

      this._cache_['globalNavs'] = navs
    }

    return this._cache_['globalNavs']
  }
}
