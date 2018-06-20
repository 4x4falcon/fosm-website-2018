from django.conf.urls import url

from . import views

app_name = 'browse'
urlpatterns = [
	url(r'^$', views.browse, name='browse'),

	url(r'^(?P<type_id>[0-9]+)/?$', views.browse_object, name='browse_object'),

	url(r'^(?P<type_id>[0-9]+)/history/$', views.browse_history, name='browse_history'),

	url(r'^node/(?P<type_id>[0-9]+)$', views.browse_node, name='browse_node'),

	url(r'^way/(?P<type_id>[0-9]+)$', views.browse_way, name='browse_way'),

	url(r'^relation/(?P<type_id>[0-9]+)$', views.browse_relation, name='browse_relation'),

	url(r'^changeset/(?P<type_id>[0-9]+)$', views.browse_changeset, name='browse_changeset'),


]

