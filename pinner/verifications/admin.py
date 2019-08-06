from django.contrib import admin
from . import models


@admin.register(models.Verification)
class Verifications(admin.ModelAdmin):
    list_display = (
        'id',
        'target',
        'payload',
        'is_verified',
        'key',
    )
