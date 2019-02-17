import uuid
import graphene
from django.db import IntegrityError
from graphql_jwt.decorators import login_required
from graphql_jwt.shortcuts import get_token
from users import models as users_models
from django.contrib.auth.models import User
from . import models, types
from . import sendSMS

class MarkAsVerified(graphene.Mutation):

    class Arguments:
        verificationId = graphene.Int(required=True)

    Output = types.MarkAsVerifiedResponse

    @login_required
    def mutate(self, info, **kwargs):

        verificationId = kwargs.get('verificationId')
        user = info.context.user

        try:
            verification = models.Verification.objects.get(
                id=verificationId
            )
            verification.verified=True
            verification.save()
            return types.MarkAsVerifiedResponse(ok=True)
            
        except models.Verification.DoesNotExist:
            raise Exception('Verification Not Found')

class StartPhoneVerification(graphene.Mutation):

    class Arguments:
        phoneNumber = graphene.String(required=True)
    
    Output = types.StartPhoneVerificationResponse
    
    def mutate(self, info, **kwargs):

        phoneNumber = kwargs.get('phoneNumber')

        try: 
            existingVerification = models.Verification.objects.get(
                payload=phoneNumber
            )
            if existingVerification:
                existingVerification.delete()

        except IntegrityError as e:
            raise Exception("Wrong Phone Number")

        finally:
            newVerification = models.Verification.objects.create(
                payload=phoneNumber,
                target="Phone"
            )
            newVerification.save()
            sendSMS.sendVerificationSMS(newVerification.payload, newVerification.key)
            return types.StartPhoneVerificationResponse(ok=True)
            
class CompletePhoneVerification(graphene.Mutation):
    
    class Arguments:
        phoneNumber = graphene.String(required=True)
        key = graphene.String(required=True)

    Output = types.CompletePhoneVerificationResponse

    def mutate(self, info, **kwargs):

        phoneNumber = kwargs.get('phoneNumber')
        key = kwargs.get('key')

        try:
            verification = models.Verification.objects.get(
                payload=phoneNumber,
                key=key
            )
            if not verification:
                return types.CompletePhoneVerificationResponse(ok=False)
            else:
                verification.verified = True
                verification.save()

        except IntegrityError as e:
            raise Exception("Wrong Phone Number")


        try: 
            user = users_models.Profile.objects.get(phoneNumber=phoneNumber)
            user.save()
        
        except:
            pass

        try:
            uuiduser = str(uuid.uuid4().hex)
            print(uuid)
            username = uuiduser
            password = uuiduser
            user = User.objects.create_user(username, password)
            profile = users_models.Profile.objects.create(
                user=user,
                phoneNumber=phoneNumber
            )
            profile.verifiedPhoneNumber = True
            profile.save()
            if user:
                user.save()
                token = get_token(user)
                return types.CompletePhoneVerificationResponse(ok=True, token=token)
            else:
                types.CompletePhoneVerificationResponse(ok=False)

        except IntegrityError as e:
            raise Exception("No Phone to Verify")