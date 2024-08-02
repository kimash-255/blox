class DoggyViewSet(GenericViewSet):
    queryset = Doggy.objects.all()
    filterset_class = DoggyFilter
    serializer_class = DoggySerializer

