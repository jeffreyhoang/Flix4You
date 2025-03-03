from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile  # Import Profile model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}  

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()   # show username
    # user = serializers.PrimaryKeyRelatedField(read_only=True)   # show foreign key

    class Meta:
        model = Profile
        fields = "__all__"
