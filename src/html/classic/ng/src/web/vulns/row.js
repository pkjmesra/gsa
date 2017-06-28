/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2017 Greenbone Networks GmbH
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

import {datetime} from '../../locale.js';

import PropTypes from '../proptypes.js';
import {render_component} from '../render.js';

import {withEntityRow} from '../entities/row.js';

import InfoLink from '../components/link/infolink.js';
import Link from '../components/link/link.js';

import SeverityBar from '../components/bar/severitybar.js';

import TableRow from '../components/table/row.js';
import TableData from '../components/table/data.js';

const Row = ({entity, links = true, actions, ...other}) => {
  return (
    <TableRow>
      <TableData>
        <InfoLink
          legacy
          type="nvt"
          id={entity.id}
          textOnly={!links}>
          {entity.name}
        </InfoLink>
      </TableData>
      <TableData>
        {datetime(entity.results.oldest)}
      </TableData>
      <TableData>
        {datetime(entity.results.newest)}
      </TableData>
      <TableData flex align="center">
        <SeverityBar severity={entity.severity}/>
      </TableData>
      <TableData flex align="center">
        {entity.qod} %
      </TableData>
      <TableData flex align="center">
        <Link
          to={'results?filter=nvt=' + entity.id}
          textOnly={!links}>
          {entity.results.count}
        </Link>
      </TableData>
      <TableData flex align="center">
        {entity.hosts.count}
      </TableData>
      {render_component(actions, {...other, entity})}
    </TableRow>
  );
};

Row.propTypes = {
  actions: PropTypes.componentOrFalse,
  entity: PropTypes.object.isRequired,
  links: PropTypes.bool,
};

export default withEntityRow(Row);

// vim: set ts=2 sw=2 tw=80:
