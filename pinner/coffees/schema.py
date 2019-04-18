import graphene
from . import types, queries, mutations


class Query(object):

    get_coffees = graphene.Field(
        types.GetCoffeesResponse,
        resolver=queries.resolve_get_coffees,
        required=True,
        args={
            'cityName': graphene.String(required=True),
            'coffeePage': graphene.Int()
        }
    )
    coffee_detail = graphene.Field(
        types.CoffeeDetailResponse,
        resolver=queries.resolve_coffee_detail,
        required=True,
        args={
            'coffeeId': graphene.Int(required=True),
        }
    )
    get_matches = graphene.Field(
        types.GetMatchesResponse,
        resolver=queries.resolve_get_matches,
        required=True,
        args={
            'matchPage': graphene.Int()
        }
    )


class Mutation(object):

    request_coffee = mutations.RequestCoffee.Field(required=True)
    match = mutations.Match.Field(required=True)
    un_match = mutations.UnMatch.Field(required=True)