import { MODULE_KIND_MAP } from './constants'

const getWelcomeTemplate = () => ({
  metadata: {
    labels: {},
    name: '',
  },
  description: '',
  age: '',
})

const FORM_TEMPLATES = {
  welcome: getWelcomeTemplate,
}

export default FORM_TEMPLATES

export const getFormTemplate = module => {
  const kind = MODULE_KIND_MAP[module]

  if (!kind || !FORM_TEMPLATES[module]) {
    return {}
  }

  const template = FORM_TEMPLATES[module]()

  return {
    [kind]: template,
  }
}
