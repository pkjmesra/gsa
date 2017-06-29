/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2016 - 2017 Greenbone Networks GmbH
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import React from 'react';

import {classes, is_defined, is_empty, is_array} from '../../../utils.js';

import PropTypes from '../../utils/proptypes.js';

import './css/layout.css';

const LAYOUT_PROPNAMES = [
  'flex', 'align', 'grow', 'shrink', 'basis', 'box', 'offset',
];

export const withLayout = (Component, defaults = {}) => {
  const LayoutWrapper = ({
    align = defaults.align,
    basis = defaults.basis,
    box = defaults.box,
    className,
    flex = defaults.flex,
    grow = defaults.grow,
    offset = defaults.offset,
    shrink = defaults.shrink,
    style = {},
    wrap = defaults.wrap,
    ...other,
  }) => {
    let css = className;

    if (is_defined(flex)) {

      if (is_empty(flex) || flex === true) {
        flex = 'row';
      }
      css = classes('flex', flex, wrap ? 'wrap' : undefined, css);

      if (is_defined(align)) {
        if (is_array(align)) {
          css = classes('justify-' + align[0], 'align-' + align[1], css);
        }
        else {
          css = classes('justify-' + align, css);
        }
      }
      // use sane defaults
      else if (flex === 'row') {
        css = classes('justify-start', 'align-center', css);
      }
      else {
        css = classes('justify-center', 'align-stretch', css);
      }
    }

    if (box) {
      css = classes('box', css);
    }

    if (is_defined(offset)) {
      css = classes('offset-' + offset, css);
    }

    if (is_defined(grow)) {
      style.flexGrow = grow;
    }
    if (is_defined(shrink)) {
      style.flexShrink = shrink;
    }
    if (is_defined(basis)) {
      style.flexBasis = basis;
    }

    return (
      <Component
        {...other}
        className={css}
        style={style}
      />
    );
  };

  LayoutWrapper.propTypes = {
    className: PropTypes.string,
    flex: PropTypes.oneOf(['row', 'column', true]),
    wrap: PropTypes.bool,
    box: PropTypes.bool,
    align: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    grow: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    shrink: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    basis: PropTypes.string,
    offset: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    style: PropTypes.object,
  };

  return LayoutWrapper;
};

const LayoutComponent = props => {
  return (
    <div {...props}/>
  );
};

export const get_layout_props = props => {
  let values = {};

  if (!is_defined(props)) {
    return values;
  }

  for (let name of LAYOUT_PROPNAMES) {
    if (props.hasOwnProperty(name)) {
      values[name] = props[name];
    }
  }

  return values;
};

export const Layout = withLayout(LayoutComponent);

export default Layout;

// vim: set ts=2 sw=2 tw=80: