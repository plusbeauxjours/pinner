import graphene
from graphene_django.types import DjangoObjectType
from . import models
from django.contrib.auth.models import User
from config import types as config_types

class UserType(DjangoObjectType):

    following_count = graphene.Int(source='follwers_count')
    follwoers_count = graphene.Int(source='follwing_count')

    class Meta:
        model = models.User
        exclude_fields = ('password', )

class UserProfileResponse(graphene.ObjectType):
    user = graphene.Field(UserType)

class FollowUnfollowResponse(graphene.ObjectType):
    ok = graphene.Boolean()

class EditProfileResponse(graphene.ObjectType, config_types.ResponseFields):
    user = graphene.Field(UserType)

class GenderEnums(graphene.Enum):
    MALE = 'M'
    FEMALE = 'F'

class ChangePasswordResponse(graphene.ObjectType, config_types.ResponseFields):
    pass

class SearchUsersResponse(graphene.ObjectType):
    users = graphene.List(UserType)

class CheckUsernameResponse(graphene.ObjectType):
    ok = graphene.Boolean()

class CreateAccountResponse(graphene.ObjectType):
    token=graphene.String()

class LatestUserResponse(graphene.ObjectType):
    users = graphene.List(UserType)