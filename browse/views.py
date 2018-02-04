# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import get_object_or_404, render

# Create your views here.

from django.http import HttpResponse



def browse(request):
    return render(request, 'browse/index.html', {})

def browse_object(request, type, type_id):
    return render(request, 'browse/index.html', {'type': type, 'id': type_id})

def browse_history(request, type, type_id):
    return render(request, 'browse/history.html', {'type': type, 'id': type_id})

def browse_node(request, type_id):
    return render(request, 'browse/index.html', {'type': 'node', 'id': type_id})

def browse_way(request, type_id):
    return render(request, 'browse/index.html', {'type': 'way', 'id': type_id})

def browse_relation(request, type_id):
    return render(request, 'browse/index.html', {'type': 'Relation', 'id': type_id})

def browse_changeset(request, type_id):
    return render(request, 'browse/index.html', {'type': 'changeset', 'id': type_id})



