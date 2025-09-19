from django.contrib import admin
from django.urls import path, include
from school import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.accueil, name='accueil'),
    path('logout/', views.logout_view, name='logout'),
]
