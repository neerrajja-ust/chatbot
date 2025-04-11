from rest_framework import serializers
from .models import Message

class MessageSerializers(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = '__all__'
        # fields = ['user_message', 'bot_response', 'timestamp']
        # exclude = ['id']