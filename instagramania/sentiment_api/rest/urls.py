from django.urls import path
# from tg_react.routers import SuffixlessRouter
from rest_framework import routers

from ..rest.views import PostViewSet, CommentViewSet, predict

# router = SuffixlessRouter(trailing_slash=False)
router = routers.SimpleRouter()

router.register(r'posts', PostViewSet,  basename='posts')
router.register(r'comments', CommentViewSet,  basename='comments')
# router.register(r'predict/', predict,  basename='predict')

urlpatterns = router.urls

urlpatterns.append(path(r'predict', predict))
#
# urlpatterns.append(path(r'comments/', CommentViewSet.as_view()))
# urlpatterns.append(path(r'comments/<int:pk>/', CommentViewSet.as_view()))
#



