from django.shortcuts import render

# Create your views here.
from django.views.generic import View

class AjaxHandlerView(View):
    def get(self,request):
        btnText = request.GET.get('btn_text')
        print(btnText)
        return render(request,'app_01/index.html',{'title':'Demo', 'seconds':'hello world'})
        