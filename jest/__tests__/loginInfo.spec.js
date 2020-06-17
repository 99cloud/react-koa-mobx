/*
 * Created: Wed Jun 17 2020
 * Author: Apple
 */
import React from 'react'
import { shallow, mount} from 'enzyme'
import { LoginInfo } from 'components/Layout'
import { inject, observer } from 'mobx-react'
import RootStore from 'stores/root'
import { Provider } from 'mobx-react'

const store = {
  rootStore: new RootStore()
}


describe('test suite: Test LoginInfo', () => {
  it('case: expect Test render a div with className: logined', () => {
      const wrapper = mount(
        <Provider {...store}>
          <LoginInfo />
        </Provider>
      );
      expect(wrapper.find('.logined').length).toEqual(1);
  });
});
