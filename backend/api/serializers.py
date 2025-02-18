from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}   # Accept password when creating new user, but do not return password when giving information about a user

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user