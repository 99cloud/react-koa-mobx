import { action, observable, extendObservable } from 'mobx'
import { RouterStore } from 'mobx-react-router'
import { parse } from 'qs'
import { getQueryString } from 'utils'
import cookie from 'utils/cookie'

export default class RootStore {
  @observable
  navs = globals.config.navs

  @observable
  showGlobalNav = true

  constructor() {
    this.routing = new RouterStore()
    this.routing.query = this.query

    global.navigateTo = this.routing.push
  }

  register(name, store) {
    extendObservable(this, { [name]: store })
  }

  query = (params = {}, refresh = false) => {
    const { pathname, search } = this.routing.location
    const currentParams = parse(search.slice(1))

    const newParams = refresh ? params : { ...currentParams, ...params }

    this.routing.push(`${pathname}?${getQueryString(newParams)}`)
  }

  @action
  toggleGlobalNav = () => {
    this.showGlobalNav = !this.showGlobalNav
  }

  @action
  hideGlobalNav = () => {
    this.showGlobalNav = false
  }

  @action
  async switchLang() {
    const lang = cookie('lang') === 'zh' ? 'en' : 'zh'

    cookie('lang', lang)
    window.location.reload()
  }

  @action
  async login(params) {
    return await request.post('login', params)
  }

  @action
  async logout() {
    await request.post('logout')
  }
}
