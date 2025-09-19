from django.contrib import admin

from django.contrib import admin
from .models import Classe, Eleve, Matiere, Note

admin.site.register(Classe)
admin.site.register(Eleve)
admin.site.register(Matiere)
admin.site.register(Note)
