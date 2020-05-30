from django.urls import path
from .views import AjaxHandlerView, index, postFriend, checkNickName, FriendView
urlpatterns = [
    path('book/',AjaxHandlerView.as_view(),name='index'),
    #path('', index, name='home'),
    path("", FriendView.as_view(), name = "friend_cbv"),
    path('post/ajax/friend/', postFriend, name='post_friend'),
    path('get/ajax/validate/nickname/', checkNickName, name = "validate_nickname"),
]
