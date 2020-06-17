/*
 * Created: Wed Jun 17 2020
 * Author: Apple
 */

import { configure } from 'enzyme'
import React16Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from 'jsdom'

configure({ adapter: new React16Adapter() })

global.t = key => key
global.t.html = key => key

global.request = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
}