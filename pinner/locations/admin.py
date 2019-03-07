from django.contrib import admin
from . import models


@admin.register(models.Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = (
        'countryname',
        'city_count',
        'user_count',
        'user_log_count'
    )


@admin.register(models.City)
class CityAdmin(admin.ModelAdmin):
    list_display = (
        'cityname',
        'like_count',
        'user_count',
        'user_log_count'
    )


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    pass


@admin.register(models.LocationLog)
class LocationLogAdmin(admin.ModelAdmin):
    pass
