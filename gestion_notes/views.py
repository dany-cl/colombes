from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Bienvenue dans l'application de gestion des notes</h1>")
