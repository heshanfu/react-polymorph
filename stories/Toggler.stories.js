import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { observable, action as mobxAction } from 'mobx';
import PropsObserver from './support/PropsObserver';
import Toggler from '../source/components/Toggler';
import SimpleTogglerSkin from '../source/skins/simple/TogglerSkin';

storiesOf('Toggler', module)

  .addDecorator((story) => {
    const onChangeAction = action('onChange');
    const state = observable({
      checked: false,
      onChange: mobxAction((value, event) => {
        state.checked = value;
        onChangeAction(value, event);
      })
    });
    return <PropsObserver propsForChildren={state}>{story()}</PropsObserver>;
  })

  // ====== Stories ======

  .add('plain', () => (
    <Toggler
      labelLeft="Included"
      labelRight="Excluded"
      skin={<SimpleTogglerSkin />}
    />
  ))

  .add('in text', () => (
    <div>
      <span>Fees&nbsp;</span>
      <Toggler
        labelLeft="Included"
        labelRight="Excluded"
        skin={<SimpleTogglerSkin />}
      />
      <span>&nbsp;from the amount</span>
    </div>
  ))

  .add('disabled', () => (
    <Toggler
      disabled
      labelLeft="Included"
      labelRight="Excluded"
      skin={<SimpleTogglerSkin />}
    />
  ));
