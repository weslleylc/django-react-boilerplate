from django.db import models
from accounts.models import User

# Create your models here.

class IntegerRangeField(models.IntegerField):
    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.IntegerField.__init__(self, verbose_name, name, **kwargs)

    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value':self.max_value}
        defaults.update(kwargs)
        return super(IntegerRangeField, self).formfield(**defaults)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='inspected_post')
    instagram_user = models.CharField(max_length=255)
    token = models.CharField(max_length=255)
    image_path = models.CharField(max_length=1000, blank=True, null=True)
    description = models.CharField(max_length=1000, blank=True, null=True, default="No description")
    link = models.CharField(max_length=1000)
    likes = models.IntegerField(blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    number_comments = models.IntegerField(blank=True, null=True)
    number_positive = models.IntegerField(blank=True, null=True)
    number_negative = models.IntegerField(blank=True, null=True)



class Comment(models.Model):
    comment = models.TextField(max_length=1000)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True, related_name='reply_set')
    sentiment = IntegerRangeField(min_value=0, max_value=100)
    likes = models.IntegerField(blank=True, default=0)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True, related_name='comments_post')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

