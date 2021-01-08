from django.contrib import admin

# Register your models here.
from sentiment_api.models import Post, Comment

admin.site.register(Post)
admin.site.register(Comment)
