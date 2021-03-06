# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from __future__ import print_function
from django.conf.urls import url

from . import views

app_name = 'frontpage'
urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^getting_started', views.getting_started, name='getting-started'),
	url(r'^whats_different', views.whats_different, name='whats-different'),
]
