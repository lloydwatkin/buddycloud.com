#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'buddycloud team'
SITENAME = u'buddycloud.com'
SITEURL = ''

TIMEZONE = 'Europe/Berlin'

DEFAULT_LANG = u'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

# Blogroll
LINKS =  (('Pelican', 'http://getpelican.com/'),
          ('Python.org', 'http://python.org/'),
          ('Jinja2', 'http://jinja.pocoo.org/'),
          ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

STATIC_PATHS = [ 'images', 'CNAME' ]

THEME = 'pelican-bootstrap3'

MD_EXTENSIONS = [ 'codehilite(css_class=highlight)', 'extra', 'mdext.tooglable_tabs' ]


# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
