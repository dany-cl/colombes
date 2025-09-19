from django.db import models

class Classe(models.Model):
    id_classe = models.CharField(max_length=50, primary_key=True)
    niveau = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.niveau} ({self.id_classe})"

class Eleve(models.Model):
    matricule_eleve = models.CharField(max_length=50, primary_key=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    date_naissance = models.DateField()
    classe = models.ForeignKey(Classe, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nom} {self.prenom}"

class Matiere(models.Model):
    id_matiere = models.CharField(max_length=50, primary_key=True)
    nom = models.CharField(max_length=50)

    def __str__(self):
        return self.nom

class Note(models.Model):
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE)
    matiere = models.ForeignKey(Matiere, on_delete=models.CASCADE)
    valeur = models.DecimalField(max_digits=5, decimal_places=2)
    appreciation = models.CharField(max_length=50, null=True, blank=True)
    type = models.CharField(max_length=50, null=True, blank=True)
    date_note = models.DateField()
    coefficient = models.IntegerField(default=1)

    class Meta:
        unique_together = ('eleve', 'matiere')

    def __str__(self):
        return f"{self.eleve} - {self.matiere}: {self.valeur}"
