/* Greenbone Security Assistant
 * $Id$
 * Description: Global settings for GSA
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2016 Greenbone Networks GmbH
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

#ifndef _GSAD_SETTINGS_H
#define _GSAD_SETTINGS_H

#include <glib.h>

void vendor_version_set (const gchar *);

const gchar *vendor_version_get ();


int label_name_set (const gchar *);

const gchar *label_name_get ();


void set_session_timeout (int timeout);

int get_session_timeout ();


void set_use_secure_cookie (int use);

gboolean is_use_secure_cookie ();


void set_http_content_security_policy (const gchar * policy);

const gchar * get_http_content_security_policy ();


void set_http_x_frame_options (const gchar * options);

const gchar * get_http_x_frame_options ();


void set_http_cors_origin (const gchar * origin);

const gchar * get_http_cors_origin ();


void set_http_guest_chart_x_frame_options (const gchar * options);

const gchar * get_http_guest_chart_x_frame_options ();


void set_http_guest_chart_content_security_policy (const gchar * policy);

const gchar * get_http_guest_chart_content_security_policy ();


void set_http_strict_transport_security (const gchar * policy);

const gchar * get_http_strict_transport_security ();


void set_ignore_http_x_real_ip (gboolean ignore);

gboolean get_ignore_http_x_real_ip ();


void set_per_ip_connection_limit (int limit);

int get_per_ip_connection_limit ();


void set_unix_socket (int socket);

gboolean is_unix_socket ();


void set_guest_username (const gchar *);

const gchar * get_guest_username();


void set_guest_password (const gchar *);

const gchar * get_guest_password ();


gboolean is_ignore_http_x_real_ip ();

#endif /* _GSAD_SETTINGS_H */
