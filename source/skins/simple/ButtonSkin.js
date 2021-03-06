// @flow
import React from 'react';
import type { Element } from 'react';

// external libraries
import classnames from 'classnames';

// internal utility functions
import { pickDOMProps } from '../../utils';

type Props = {
  className: string,
  disabled: boolean,
  label: string | Element<any>,
  theme: Object,
  themeId: string
};

export default (props: Props) => (
  <button
    {...pickDOMProps(props)}
    className={classnames([
      props.className,
      props.theme[props.themeId].root,
      props.disabled ? props.theme[props.themeId].disabled : null
    ])}
  >
    {props.label}
  </button>
);
