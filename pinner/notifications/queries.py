from . import types, models
from django.db.models import Count, F, Q
from django.db.models.fields import DateField
from django.db.models.functions import Trunc

from graphql_jwt.decorators import login_required
from locations import models as location_models
from django.contrib.auth.models import User
from locations import types as location_types

@login_required
def resolve_get_notifications(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 20 * page

    nextPage = page+1

    following_profiles = user.profile.followings.values('id').all()

    upload_notifications = models.Notification.objects.filter(
        actor__profile__id__in=following_profiles, verb='upload')

    notifications = user.notification_to.all()

    combined = notifications.union(upload_notifications).order_by(
        '-created_at')

    notifications = combined[offset:20 + offset]

    hasNextPage = offset < combined.count()
    print(hasNextPage)

    return types.GetNotificationsResponse(
        notifications=notifications, 
        page=nextPage, 
        hasNextPage=hasNextPage
        )


@login_required
def resolve_search_get_notifications(self, info, **kwargs):

    user = info.context.user
    term = kwargs.get('term', "")
    page = kwargs.get('page', 0)
    offset = 20 * page

    nextPage = page+1

    following_profiles = user.profile.followings.values('id').all()

    upload_notifications = models.Notification.objects.filter(
        actor__profile__id__in=following_profiles, verb='upload').filter(
            actor__username__icontains=term)

    notifications = user.notification_to.all().filter(
            actor__username__icontains=term)

    if len(term) > 1:
        combined = notifications.union(upload_notifications).order_by(
            '-created_at')
        for i in combined:
            print()
            
        notifications = combined[offset:20 + offset]

        hasNextPage = offset < combined.count()
        print(hasNextPage)

        return types.GetNotificationsResponse(
            notifications=notifications, 
            page=nextPage, 
            hasNextPage=hasNextPage
            )
    else: 
        return types.GetNotificationsResponse(
            notifications=None, 
            page=nextPage, 
            hasNextPage=False
            )


@login_required
def resolve_get_trips(self, info, **kwargs):

    me = info.context.user
    username = kwargs.get('username')
    user = User.objects.prefetch_related('movenotification').get(username=username)
    tripPage = kwargs.get('tripPage', 0)

    if (tripPage is 0):
        trip = user.movenotification.all().order_by('-start_date')[:20]

    else:
        trip = user.movenotification.all().order_by('-start_date')[:20]

    return location_types.TripResponse(trip=trip)


@login_required
def resolve_get_duration_my_trip(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    startDate = kwargs.get('startDate')
    endDate = kwargs.get('endDate')

    try:
        my_trip = user.movenotification.filter(
            city__city_name=cityName, start_date__range=(
            startDate, endDate)) | user.movenotification.filter(
                city__city_name=cityName, 
                end_date__range=(startDate, endDate)
            )

        return types.DurationTripsResponse(moveNotifications=my_trip)

    except models.MoveNotification.DoesNotExist:
        raise Exception("You've never been there at the same time")

