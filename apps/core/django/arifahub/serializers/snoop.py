class DoggySerializer(serializers.ModelSerializer):
    class Meta:
        model = Doggy
        fields = '__all__'

