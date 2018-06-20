# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import get_object_or_404, render

# Create your views here.

from django.http import HttpResponse

#from .models import UserData, UserPreference



def contributor(request):
    return render(request, 'contributor/index.html', {})

def contributor_name(request, display_name):
    return render(request, 'contributor/index.html', {'display_name': display_name})

def contributor_history(request, display_name):
    return render(request, 'contributor/history.html', {'display_name': display_name})

def contributor_details(request, display_name):
    return render(request, 'contributor/details.html', {'display_name': display_name})

