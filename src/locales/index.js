import zhModules from './zh'
import enModules from './en'

export default {
  zh: Object.assign({}, ...zhModules.map(item => item.default)),
  en: Object.assign({}, ...enModules.map(item => item.default)),
}
