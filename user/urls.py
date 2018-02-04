from django.conf.urls import url

from . import views

app_name = 'user'
urlpatterns = [
	url(r'^$', views.user, name='user'),
	url(ur'^(?P<display_name>.*)/?$', views.user_name, name='user_name'),
	url(ur'^(?P<display_name>.*)/history/?$', views.user_history, name='user_history'),
]

