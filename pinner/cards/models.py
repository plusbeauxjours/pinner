from django.db import models
from users import models as user_models
from django.contrib.humanize.templatetags.humanize import naturaltime
from config import models as config_models

class Location(config_models.TimeStampedModel):

    city = models.CharField(max_length=30)

    def __str__(self):
        return self.city

class TimeStampedModel(config_models.TimeStampedModel):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta: 
        abstract=True

class Card(config_models.TimeStampedModel):

    creator = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True, related_name='cards')
    caption = models.TextField()
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, related_name='location')
    file = models.URLField()

    @property
    def like_count(self):
         return self.likes.all().count()

    @property
    def comment_count(self):
        return self.comments.all().count()

    @property
    def natural_time(self):
        return naturaltime(self.create_at)

    def __str__(self):
        return 'Location: {} - Caption: {} - Creator: {}'.format(self.location, self.caption, self.creator)

    class Meta:
        ordering = ['-created_at']

class Comment(config_models.TimeStampedModel):
    
    message = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True)
    card = models.ForeignKey(Card, on_delete=models.SET_NULL, null=True, related_name='comments')

    def __str__(self):
        return 'User: {} - Comment: {}'.format(self.creator.username, self.message)

class Like(config_models.TimeStampedModel):
    
    creator = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True)
    card = models.ForeignKey(Card, on_delete=models.SET_NULL, null=True )

    def __str__(self):
        return 'User: {} - Card Caption: {}'.format(self.creator.username, self.card.caption)