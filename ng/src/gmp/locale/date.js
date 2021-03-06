/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2016 - 2018 Greenbone Networks GmbH
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
import moment from 'moment';

import logger from '../log';

import {is_defined, is_string, is_date} from '../utils/identity';

import {parse_int} from '../parser';

import {translate} from './lang';

const log = logger.getLogger('gmp.locale.date');

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;

function date_format(date, format) {
  if (!is_defined(date)) {
    return undefined;
  }

  if (!moment.isMoment(date)) {
    if (is_string(date) || is_date(date)) {
      date = moment(date);
    }
    else {
      log.error('Invalid date', date);
      return undefined;
    }
  }
  return date.format(format);
}

export function short_date(date) {
  return date_format(date, 'L');
}

export function long_date(date) {
  return date_format(date, 'llll z');
}

export function datetime(date) {
  return date_format(date, 'llll');
}
export function interval(seconds = 0) {
  if (seconds % WEEK === 0) {
    if (seconds === WEEK) {
      return translate('One week');
    }
    const weeks = parse_int(seconds / WEEK);
    return translate('{{number}} weeks', {number: weeks});
  }

  if (seconds % DAY === 0) {
    if (seconds === DAY) {
      return translate('One day');
    }
    const days = parse_int(seconds / DAY);
    return translate('{{number}} days', {number: days});
  }

  if (seconds % HOUR === 0) {
    if (seconds === HOUR) {
      return translate('One hour');
    }
    const hours = parse_int(seconds / HOUR);
    return translate('{{number}} hours', {number: hours});
  }

  if (seconds % MINUTE === 0) {
    if (seconds === MINUTE) {
      return translate('One minute');
    }
    const minutes = parse_int(seconds / MINUTE);
    return translate('{{number}} minutes', {number: minutes});
  }

  if (seconds === 1) {
    return translate('One second');
  }

  return translate('{{number}} seconds', {number: seconds});
}

export const duration = (start, end) => {
  const dur = moment.duration(end - start);
  const hours = dur.hours();
  const days = dur.days();

  let minutes = dur.minutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (days === 0) {
    return translate('{{hours}}:{{minutes}} h', {hours, minutes});
  }

  if (days === 1) {
    return translate('{{days}} day {{hours}}:{{minutes}} h', {
      days,
      hours,
      minutes,
    });
  }

  return translate('{{days}} days {{hours}}:{{minutes}} h', {
    days,
    hours,
    minutes,
  });
};

// vim: set ts=2 sw=2 tw=80:
