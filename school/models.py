from django.db import models
from django.contrib.auth.models import User
from django.db import models

class Employer(models.Model):
    cin = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50, db_column="prénom")
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = "employer"


class Employer(models.Model):
    cin = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=50)
    prénom = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    numéro = models.IntegerField()

    class Meta:
        db_table = "employer"


class Admin(models.Model):
    cin = models.OneToOneField(
        Employer, on_delete=models.CASCADE, primary_key=True, db_column="cin"
    )

    class Meta:
        db_table = "admin"


class Matiere(models.Model):
    id_matiere = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=50)

    class Meta:
        db_table = "matiere"

class Eleve(models.Model):
    id_eleve = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50, db_column="prénom")  # 👈 db_column
    classe = models.CharField(max_length=50)

    class Meta:
        db_table = "eleves"



class Note(models.Model):
    id_note = models.IntegerField(primary_key=True)
    id_classe = models.CharField(max_length=50)
    valeur = models.DecimalField(max_digits=15, decimal_places=2)
    matricule_eleve = models.CharField(max_length=50)

    class Meta:
        db_table = "note"

class Classe(models.Model):
    id_classe = models.IntegerField(primary_key=True)
    niveau = models.CharField(max_length=50)
    id_eleve = models.ForeignKey(
        Eleve,
        on_delete=models.CASCADE,
        db_column="id_eleve",
        related_name="classes"
    )

    class Meta:
        db_table = "classe"


class Enseignant(models.Model):
    cin = models.OneToOneField(
        Employer, on_delete=models.CASCADE, primary_key=True, db_column="cin"
    )

    class Meta:
        db_table = "enseignant"


class Enseigner(models.Model):
    cin = models.ForeignKey(
        Enseignant, on_delete=models.CASCADE, db_column="cin", primary_key=True
    )
    id_matiere = models.ForeignKey(
        Matiere, on_delete=models.CASCADE, db_column="id_matiere"
    )
    id_classe = models.ForeignKey(
        Classe, on_delete=models.CASCADE, db_column="id_classe"
    )

    class Meta:
        db_table = "enseigner"
        unique_together = (("cin", "id_matiere", "id_classe"),)


class Noter(models.Model):
    id_matiere = models.ForeignKey(
        Matiere, on_delete=models.CASCADE, db_column="id_matiere", primary_key=True
    )
    id_eleve = models.ForeignKey(
        Eleve, on_delete=models.CASCADE, db_column="id_eleve"
    )
    id_note = models.ForeignKey(
        Note, on_delete=models.CASCADE, db_column="id_note"
    )
    id_classe = models.ForeignKey(
        Classe, on_delete=models.CASCADE, db_column="id_classe"
    )
    coefficient = models.IntegerField()
    appresiation = models.CharField(max_length=50)
    type = models.CharField(max_length=50)

    class Meta:
        db_table = "noter"
        unique_together = (("id_matiere", "id_eleve", "id_note", "id_classe"),)
