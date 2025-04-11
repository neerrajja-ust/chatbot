from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from openai import AzureOpenAI
import os

from .models import Message
from .serializers import MessageSerializers

class ChatAPIView(APIView):
    def post(self, request):
        try:
            if not request.data:
                return Response({"error": "Empty request body"}, status=status.HTTP_400_BAD_REQUEST)

            data = request.data
            user_message = data.get("message")

            if not user_message:
                return Response({"error": "Message field is required"}, status=status.HTTP_400_BAD_REQUEST)

            # Initialize Azure OpenAI client
            client = AzureOpenAI(
                azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
                api_key=os.getenv("AZURE_OPENAI_API_KEY"),
                api_version="2024-02-01"
            )

            # Get AI response
            response = client.chat.completions.create(
                model="gpt-35-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": user_message}
                ]
            )

            bot_response = response.choices[0].message.content

            # Save to database
            chat = Message.objects.create(
                user_message=user_message,
                bot_response=bot_response
            )

            serializer = MessageSerializers(chat)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
