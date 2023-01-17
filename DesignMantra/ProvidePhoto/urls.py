from django import views
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.render_page,name ="home"),
    path('dress/<int:dress_id>', views.dress_detail, name='dress_detail'),
]
