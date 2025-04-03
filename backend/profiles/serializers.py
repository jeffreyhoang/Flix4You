from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "first_name", "last_name", "is_active"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)   # Ensure password is hashed
    
    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        instance = super().update(instance, validated_data)

        if password:
            instance.set_password(password)
            instance.save()

        return instance

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()   # Show username instead of FK

    class Meta:
        model = Profile
        fields = "__all__"

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop("user", None)
        return super().update(instance, validated_data)
