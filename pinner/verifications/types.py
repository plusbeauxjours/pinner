import graphene
from graphene_django.types import DjangoObjectType
from config import types as config_types
from . import models

class VerificationType(DjangoObjectType):

    class Meta:
        model = models.Verification

class GetVerificationsResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    verifications = graphene.List(VerificationType)

class MarkAsVerifiedResponse(graphene.ObjectType):
    ok = graphene.Boolean()