from django.db import IntegrityError
from . import types, models
from graphql_jwt.decorators import login_required
from django.utils import timezone
from django.db.models import Q


from django.contrib.auth.models import User
from cards import models as card_models
from cards import types as card_types
from notifications import models as notification_models
from coffees import models as coffee_models


@login_required
def resolve_get_cities(self, info, **kwargs):

    username = kwargs.get('username')
    profile = User.objects.get(username=username)

    cities = profile.movenotification.all().order_by('city').distinct('city')

    return types.FootprintsResponse(footprints=cities)


@login_required
def resolve_get_countries(self, info, **kwargs):

    username = kwargs.get('username')
    profile = User.objects.get(username=username)

    countries = profile.movenotification.all().order_by('city__country').distinct('city__country')

    return types.FootprintsResponse(footprints=countries)


@login_required
def resolve_get_continents(self, info, **kwargs):

    username = kwargs.get('username')
    profile = User.objects.get(username=username)

    continents = profile.movenotification.all().order_by('city__country__continent').distinct('city__country__continent')

    return types.FootprintsResponse(footprints=continents)


@login_required
def resolve_search_citiess(self, info, **kwargs):

    user = info.context.user
    term = kwargs.get('term')

    if len(term) < 2:

        raise Exception("Search Term is Too Short")

    else:

        cities = models.City.objects.filter(city_name__icontains=term)

        return types.CitiesResponse(cities=cities)


@login_required
def resolve_search_countries(self, info, **kwargs):

    user = info.context.user
    term = kwargs.get('term')

    if len(term) < 2:

        raise Exception("Search Term is Too Short")

    else:

        countries = models.Country.objects.filter(country_name__icontains=term)

        return types.CountriesResponse(countries=countries)


@login_required
def resolve_search_continents(self, info, **kwargs):

    user = info.context.user
    term = kwargs.get('term')

    if len(term) < 2:

        raise Exception("Search Term is Too Short")

    else:

        continents = models.Continent.objects.filter(continent_name__icontains=term)

        return types.ContinentsResponse(continents=continents)


@login_required
def resolve_trip_profile(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    startDate = kwargs.get('startDate')
    endDate = kwargs.get('endDate')

    city = models.City.objects.get(city_name=cityName)
    usersBefore = city.movenotification.filter(Q(start_date__range=(
        startDate, endDate)) | Q(end_date__range=(
            startDate, endDate))).order_by('actor_id').distinct('actor_id')
    userCount = usersBefore.count()
    coffees = city.coffee.filter(created_at__range=(startDate, endDate))

    return types.TripProfileResponse(city=city, usersBefore=usersBefore, userCount=userCount, coffees=coffees)


@login_required
def resolve_city_profile(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')
    page = kwargs.get('page', 0)

    city = models.City.objects.get(city_name=cityName)

    usersNow = User.objects.filter(
        profile__current_city__city_name=cityName).order_by('-id').distinct('id')

    if usersNow.count() < 5:
        usersBefore = notification_models.MoveNotification.objects.filter(
            city__city_name=cityName).order_by('-actor_id').distinct('actor_id')
    else:
        usersBefore = notification_models.MoveNotification.objects.filter(
            id=0)

    coffees = city.coffee.filter(expires__gt=timezone.now())

    return card_types.FirstAnnotateRespose(usersNow=usersNow, usersBefore=usersBefore, city=city, coffees=coffees)


@login_required
def resolve_country_profile(self, info, **kwargs):

    user = info.context.user
    countryName = kwargs.get('countryName')
    page = kwargs.get('page', 0)

    country = models.Country.objects.get(country_name=countryName)

    allCities = models.City.objects.filter(country__country_name=countryName)

    usersNow = User.objects.filter(
        profile__current_city__country__country_name=countryName).order_by('-id').distinct('id')

    if usersNow.count() < 5:
        usersBefore = notification_models.MoveNotification.objects.filter(
            city__country__country_name=countryName).order_by('-actor_id').distinct('actor_id')
    else:
        usersBefore = notification_models.MoveNotification.objects.filter(
            id=0)

    if (page is 0):
        cities = models.City.objects.filter(country__country_name=countryName)[:6]
    else:
        cities = models.City.objects.filter(country__country_name=countryName)[6:20]

    coffees = coffee_models.Coffee.objects.filter(Q(city__in=allCities) & Q(expires__gt=timezone.now()))[:1]

    return card_types.SecondAnnotateRespose(cities=cities, usersNow=usersNow, usersBefore=usersBefore, country=country, coffees=coffees)


@login_required
def resolve_continent_profile(self, info, **kwargs):

    user = info.context.user
    continentName = kwargs.get('continentName')
    page = kwargs.get('page', 0)

    continent = models.Continent.objects.get(continent_name=continentName)

    allCities = models.City.objects.filter(country__continent__continent_name=continentName)

    usersNow = User.objects.filter(
        profile__current_city__country__continent__continent_name=continentName).order_by('-id').distinct('id')

    if usersNow.count() < 5:
        usersBefore = notification_models.MoveNotification.objects.filter(
            city__country__continent__continent_name=continentName).order_by('-actor_id').distinct('actor_id')
    else:
        usersBefore = notification_models.MoveNotification.objects.filter(
            id=0)

    if (page is 0):
        countries = models.Country.objects.filter(continent__continent_name=continentName)[:6]
    else:
        countries = models.Country.objects.filter(continent__continent_name=continentName)[6:20]

    coffees = coffee_models.Coffee.objects.filter(Q(city__in=allCities) & Q(expires__gt=timezone.now()))

    return card_types.ThirdAnnotateRespose(countries=countries,  usersNow=usersNow, usersBefore=usersBefore, continent=continent, coffees=coffees)


@login_required
def resolve_get_footprints(self, info, **kwargs):

    user = info.context.user
    page = kwargs.get('page', 0)
    offset = 10 * page

    footprints = user.movenotification.all().order_by('-start_date')[offset:10 + offset]

    return types.FootprintsResponse(footprints=footprints)


@login_required
def resolve_near_cities(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')

    city = models.City.objects.get(city_name=cityName)
    cities = city.near_city.all()[:6]

    return types.CitiesResponse(cities=cities)


@login_required
def resolve_near_countries(self, info, **kwargs):

    user = info.context.user
    cityName = kwargs.get('cityName')

    city = models.City.objects.get(city_name=cityName)
    countries = city.near_country.all()[:6]

    return types.CountriesResponse(countries=countries)


@login_required
def resolve_latest_cities(self, info, **kwargs):

    latestCityPage = kwargs.get('latestCityPage', 0)

    if (latestCityPage is 0):
        cities = models.City.objects.all().order_by(
            '-created_at')[:6]
    else:
        cities = models.City.objects.all().order_by(
            '-created_at')[6:12]

    return types.CitiesResponse(cities=cities)
