from django.shortcuts import render

# Create your views here.
from django.views.generic import View
from time import time
from django.http import JsonResponse
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
