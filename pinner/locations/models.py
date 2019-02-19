from django.db import models
from django.contrib.auth.models import User
from django.contrib.humanize.templatetags.humanize import naturaltime
from config import models as config_models


class Country (config_models.TimeStampedModel):

    countryname = models.CharField(max_length=100, null=True, blank=True)

    @property
    def city_count(self):
        return self.city.all().count()

    def __str__(self):
        return self.countryname


class City (config_models.TimeStampedModel):

    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, related_name='city')
    cityname = models.CharField(max_length=100, null=True, blank=True)

    @property
    def like_count(self):
        return self.likes.all().count()

    def __str__(self):
        return self.cityname


class Like(config_models.TimeStampedModel):

    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='city_likes')
    city = models.ForeignKey(
        City, on_delete=models.CASCADE, null=True, related_name='likes')

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return 'User: {} - City cityname: {}'.format(self.creator.username, self.city.cityname)