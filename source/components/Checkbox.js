// @flow
import React, { Component } from 'react';
import type { ComponentType, Element } from 'react';

// internal utility functions
import { withTheme } from '../themes/withTheme';
import { composeTheme, addThemeId } from '../utils';

// import constants
import { IDENTIFIERS } from '../themes/API';

type Props = {
  checked: boolean,
  className: string,
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  disabled: boolean,
  label: string | Element<any>,
  labelLeft: string | Element<any>,
  labelRight: string | Element<any>,
  onChange: Function,
  onBlur: Function,
  onFocus: Function,
  skin: ComponentType<any>,
  theme: Object, // will take precedence over theme in context if passed
  themeId: string,
  themeOverrides: Object
};

type State = {
  composedTheme: Object
};

class Checkbox extends Component<Props, State> {
  static defaultProps = {
    checked: false,
    disabled: false,
    theme: null,
    themeId: IDENTIFIERS.CHECKBOX,
    themeOverrides: {}
  };

  constructor(props: Props) {
    super(props);

    const { context, themeId, theme, themeOverrides } = props;

    this.state = {
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      )
    };
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const {
      skin: CheckboxSkin,
      theme,
      themeOverrides,
      context,
      ...rest
    } = this.props;

    return <CheckboxSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default withTheme(Checkbox);
