from django.shortcuts import render

# Create your views here.
from django.views.generic import View
from time import time
from django.http import JsonResponse, JsonResponse
from .models import Friend
from .forms import FriendForm
from django.core import serializers
class AjaxHandlerView(View):
    def get(self,request):
        btnText = request.GET.get('btn_text')
        #sends data to the template in json serializable object
        #but we need to check if the request is ajax req or not
        if request.is_ajax():
            t = time()
            data = {
                'seconds':t/(3600 * 24 * 365),
                'greetings':'hello, Nuh with you today!',
            }
            return JsonResponse(data, status=200)
        return render(request,'app_01/index.html',{'title':'Demo'})
    #when the request is post
    #csrf are required when post request
    def post(self, request):
        if request.is_ajax():
            card_text = request.POST.get('text')
            print(card_text)
            result = f"I've got: {card_text} Code: "
            #print(result)
            return JsonResponse({'data':result}, status=200)
#pluralsight
def index(request):
    form = FriendForm()
    all_friends = Friend.objects.all()
    context={
        'title':'Book',
        'form':form,
        'friends':all_friends,
    }
    return render(request,'app_01/home.html',context)
def checkNickName(request):
    # request should be ajax and method should be GET.
    if request.is_ajax() and request.method == 'GET':
        # get the nick name from the client side.
        nick_name = request.GET.get('nick_name',None)
        # for security we should validate the name
        # check for the nick name in the database.
        if Friend.objects.filter(nick_name = nick_name).exists():
             # if nick_name found return not valid new friend
            return JsonResponse({'valid':False,}, status=200)
             # if nick_name not found, then user can create a new friend.
        else:
            return JsonResponse({'valid':True,}, status=200)
    return JsonResponse({}, status=400)

def postFriend(request):
    #check if the form is ajax & post
    if request.is_ajax and request.method == 'POST':
        # Get the form data
        form = FriendForm(request.POST)
        # Validate and save the data
        if form.is_valid():
            instance = form.save()
            # Serialize in new friend object in json
            serialized_instance = serializers.serialize('json',[instance,])
            # Send the serialized data to the client side
            return JsonResponse({'instance':serialized_instance}, status=200)
        else:
            #form not valid
            return JsonResponse({'error':form_data.errors}, status=400)
    return JsonResponse({'error':''},status=400)

class FriendView(View):
    form_class = FriendForm
    template_name = 'app_01/home.html'

    def get(self, *args, **kwargs):
        form = self.form_class()
        friends = Friend.objects.all()
        return render(self.request, self.template_name, {"form": form, "friends": friends})

    def post(self, *args, **kwargs):
        if self.request.is_ajax and self.request.method == "POST":
            form = self.form_class(self.request.POST)
            if form.is_valid():
                instance = form.save()
                ser_instance = serializers.serialize('json', [ instance, ])
                # send to client side.
                return JsonResponse({"instance": ser_instance}, status=200)
            else:
                return JsonResponse({"error": form.errors}, status=400)

        return JsonResponse({"error": ""}, status=400)
