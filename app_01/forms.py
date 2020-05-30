from django import forms
import datetime
from .models import Friend

class FriendForm(forms.ModelForm):
    # change the widget of the date field.
    dob = forms.DateField(
        label= 'Your birthdate?',
        # change the range of the years from 1980 to currentYear - 5
        widget=forms.SelectDateWidget(years=range(1980, datetime.date.today().year-5))
    )
    def __init__(self, *args, **kwargs):
        super(FriendForm, self).__init__(*args,*kwargs)
        # add classes to each class
        # to ennable bootstrap
        for name in self.fields.keys():
            self.fields[name].widget.attrs.update({
                'class':'form-control',
            })
    class Meta:
        model = Friend
        fields = ['nick_name','first_name','last_name','lives_in','dob']
