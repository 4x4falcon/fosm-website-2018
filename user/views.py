# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import get_object_or_404, render

# Create your views here.

from django.http import HttpResponse



def user(request):
    return render(request, 'user/index.html', {})

def user_name(request, display_name):
    return render(request, 'user/index.html', {'display_name': display_name})

def user_history(request, display_name):
    return render(request, 'user/history.html', {'display_name': display_name})

