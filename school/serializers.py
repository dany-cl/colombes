from rest_framework import serializers
from .models import Eleve, Classe

class ClasseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classe
        fields = ['id_classe', 'nom', 'niveau']  # adapte selon tes champs

class EleveSerializer(serializers.ModelSerializer):
    classe = ClasseSerializer(read_only=True)

    class Meta:
        model = Eleve
        fields = ['matricule_eleve', 'nom', 'prenom', 'classe']  # adapte selon tes champs
