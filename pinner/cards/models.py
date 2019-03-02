from django.db import models
from django.contrib.auth.models import User
from django.contrib.humanize.templatetags.humanize import naturaltime
from config import models as config_models
from locations import models as location_models


class Card(config_models.TimeStampedModel):

    CATEGORY = (
        ('blabla', 'Blabla'),
        ('meetup', 'Meetup')
    )

    category = models.CharField(max_length=12, choices=CATEGORY, default='meetup')
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='cards')
    caption = models.TextField()
    city = models.ForeignKey(
        location_models.City, on_delete=models.CASCADE, related_name='city', null=True)
    country = models.ForeignKey(
        location_models.Country, on_delete=models.CASCADE, related_name='country', null=True)
    file = models.URLField(null=True, blank=True)
    border_radius = models.CharField(max_length=40)
    bg_color = models.CharField(max_length=20, null=True, blank=True, default='#FAFAFA')
    font = models.CharField(max_length=40, null=True, blank=True, default='-apple-system')
    font_color = models.CharField(max_length=20, null=True, blank=True, default='red')
    font_size = models.CharField(max_length=10, null=True, blank=True, default='10px')

    is_closed = models.BooleanField(default=False)
    is_hidden = models.BooleanField(default=False)

    @property
    def like_count(self):
        return self.likes.all().count()

    @property
    def comment_count(self):
        return self.comments.all().count()

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return 'Country: {} - City: {} - Caption: {} - Creator: {}'.format(self.country, self.city, self.caption, self.creator)


class Comment(config_models.TimeStampedModel):

    message = models.TextField()
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True)
    card = models.ForeignKey(
        Card, on_delete=models.CASCADE, null=True, related_name='comments')

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return '{} / User: {} - Comment: {} - Card: {} {}'.format(self.id, self.creator.username, self.message, self.card_id, self.card.city)


class Like(config_models.TimeStampedModel):

    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='card_likes')
    card = models.ForeignKey(
        Card, on_delete=models.CASCADE, null=True, related_name='likes')

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    def __str__(self):
        return 'User: {} - Card Caption: {}'.format(self.creator.username, self.card.caption)
