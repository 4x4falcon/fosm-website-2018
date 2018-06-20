from django.conf.urls import url

from . import views

app_name = 'contributor'
urlpatterns = [
	url(r'^$', views.contributor, name='contributor'),
	url(ur'^(?P<display_name>.*)/history/?$', views.contributor_history, name='contributor_history'),
	url(ur'^(?P<display_name>.*)/details/?$', views.contributor_details, name='contributor_details'),
	url(ur'^(?P<display_name>.*)/?$', views.contributor_name, name='contributor_name'),
]

