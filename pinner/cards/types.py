import graphene
from graphene_django.types import DjangoObjectType
from . import models
from config import types as config_types
from users import types as users_types


class CardType(DjangoObjectType):
    like_count = graphene.Int(source='like_count')
    comment_count = graphene.Int(source='comment_count')
    created_at = graphene.String(source="natural_time")
    is_liked = graphene.Boolean()

    def resolve_is_liked(self, info):
        user = info.context.user
        try:
            like = models.Like.objects.get(card=self, creator=user)
            return True
        except models.Like.DoesNotExist:
            return False

    class Meta:
        model = models.Card


class LikeType(DjangoObjectType):

    class Meta:
        model = models.Like


class CommentType(DjangoObjectType):

    class Meta:
        model = models.Comment


class FeedResponse(graphene.ObjectType):
    cards = graphene.List(CardType)


class FeedByCityResponse(graphene.ObjectType):
    cards = graphene.List(CardType)
    users = graphene.List(users_types.UserType)


class LikeCardResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class CardLikeResponse(graphene.ObjectType):
    likes = graphene.List(LikeType)


class AddCommentResponse(graphene.ObjectType):
    comment = graphene.Field(CommentType)


class DeleteCommentResponse(graphene.ObjectType):
    ok = graphene.Boolean()


class CardLikeResponse(graphene.ObjectType):
    likes = graphene.List(LikeType)


class CardDetailResponse(graphene.ObjectType):
    card = graphene.Field(CardType)


class EditCardResponse(graphene.ObjectType, config_types.ResponseFields):
    card = graphene.Field(CardType)


class DeleteCardResponse(graphene.ObjectType, config_types.ResponseFields):
    pass


class UploadCardResponse(graphene.ObjectType):
    ok = graphene.Boolean()
    card = graphene.Field(CardType)


class SearchCardsResponse(graphene.ObjectType):
    cards = graphene.List(CardType)


class LatestCardsResponse(graphene.ObjectType):
    cards = graphene.List(CardType)


class FileInputType(graphene.InputObjectType):
    url = graphene.String()
    is_video = graphene.Boolean()
