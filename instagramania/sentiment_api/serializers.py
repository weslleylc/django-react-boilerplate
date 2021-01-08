from rest_framework import serializers
from rest_framework.reverse import reverse
from rest_framework import serializers
from .models import Post, Comment



class RecursiveSerializer(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class CommentSerializer(serializers.ModelSerializer):
    reply_set = RecursiveSerializer(many=True, read_only=True)

    class Meta:
        model = Comment
        fields = ['comment', 'sentiment', 'likes', 'updated_at', 'parent',  'reply_set']


class FullPostSerializer(serializers.ModelSerializer):
    comments_post = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'token', 'link', 'updated_at', 'comments_post']

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id', 'token', 'link', 'updated_at', 'image_path', 'description', 'instagram_user', 'number_positive', 'number_negative', 'likes']


    # def create(self, validated_data):
    #     token = validated_data.pop('token', None)
    #     number_comments = validated_data.pop('number_comments', None)
    #
    #     positive, negative, total, comments = predict_sentiment_post(token, number_comments)
    #
    #     password = validated_data.pop('password', None)
    #     instance = self.Meta.model(**validated_data)
    #     if password is not None:
    #         instance.set_password(password)
    #     instance.save()
    #     return instance
    #

