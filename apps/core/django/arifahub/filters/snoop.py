class DoggyFilter(filters.FilterSet):
    class Meta:
        model = Doggy
        fields = '__all__'

