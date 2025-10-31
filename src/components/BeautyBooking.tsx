import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const BeautyBooking = () => {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([3000]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSalon, setSelectedSalon] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const services = [
    { id: 'makeup', name: 'Макияж', icon: 'Palette', priceFrom: 2500 },
    { id: 'hair', name: 'Парикмахер', icon: 'Scissors', priceFrom: 1500 },
    { id: 'manicure', name: 'Маникюр', icon: 'Hand', priceFrom: 1200 },
    { id: 'pedicure', name: 'Педикюр', icon: 'Footprints', priceFrom: 1500 }
  ];

  const salons = [
    {
      id: 1,
      name: 'Beauty Point Premium',
      rating: 4.9,
      reviews: 342,
      address: 'Тверская 15, м. Тверская',
      partner: true,
      services: {
        makeup: { price: 3500, duration: '60 мин' },
        hair: { price: 2500, duration: '90 мин' },
        manicure: { price: 1800, duration: '60 мин' },
        pedicure: { price: 2200, duration: '75 мин' }
      },
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg',
      availableTimes: ['10:00', '12:00', '14:00', '16:00', '18:00']
    },
    {
      id: 2,
      name: 'Glamour Studio',
      rating: 4.8,
      reviews: 256,
      address: 'Арбат 28, м. Арбатская',
      partner: true,
      services: {
        makeup: { price: 3000, duration: '50 мин' },
        hair: { price: 2000, duration: '80 мин' },
        manicure: { price: 1500, duration: '50 мин' },
        pedicure: { price: 1900, duration: '70 мин' }
      },
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg',
      availableTimes: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00']
    },
    {
      id: 3,
      name: 'Luxury Beauty Bar',
      rating: 4.7,
      reviews: 189,
      address: 'Кутузовский 12, м. Киевская',
      partner: true,
      services: {
        makeup: { price: 4500, duration: '70 мин' },
        hair: { price: 3500, duration: '100 мин' },
        manicure: { price: 2500, duration: '70 мин' },
        pedicure: { price: 2800, duration: '85 мин' }
      },
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg',
      availableTimes: ['11:00', '13:00', '15:00', '17:00']
    },
    {
      id: 4,
      name: 'Beauty Lounge',
      rating: 4.6,
      reviews: 145,
      address: 'Новый Арбат 5, м. Арбатская',
      partner: false,
      services: {
        makeup: { price: 2500, duration: '45 мин' },
        hair: { price: 1800, duration: '70 мин' },
        manicure: { price: 1200, duration: '45 мин' },
        pedicure: { price: 1600, duration: '60 мин' }
      },
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg',
      availableTimes: ['10:00', '12:00', '14:00', '16:00']
    }
  ];

  const filteredSalons = salons
    .filter(salon => {
      if (!selectedService) return true;
      const servicePrice = salon.services[selectedService as keyof typeof salon.services]?.price || 0;
      return servicePrice <= priceRange[0];
    })
    .sort((a, b) => {
      if (a.partner && !b.partner) return -1;
      if (!a.partner && b.partner) return 1;
      return b.rating - a.rating;
    });

  const handleBooking = () => {
    if (!selectedSalon || !selectedService || !selectedTime) {
      toast({
        title: 'Заполните все данные',
        description: 'Выберите услугу, салон и время',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Запись успешна!',
      description: `Вы записаны в ${selectedSalon.name} на ${selectedDate?.toLocaleDateString('ru-RU')} в ${selectedTime}`,
    });

    setSelectedSalon(null);
    setSelectedTime(null);
  };

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Салоны красоты</h3>
              <p className="text-sm text-muted-foreground">
                Запишитесь на услуги в лучшие салоны города. Партнёры платформы предлагают специальные условия.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Scissors" size={20} />
            Выберите услугу
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedService === service.id
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <Icon name={service.icon as any} size={32} className="mx-auto mb-2" />
                <p className="text-sm font-medium mb-1">{service.name}</p>
                <p className="text-xs text-muted-foreground">от {service.priceFrom}₽</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedService && (
        <>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Wallet" size={20} />
                Бюджет на услугу
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Максимальная цена</span>
                  <Badge variant="secondary" className="font-mono">
                    {priceRange[0].toLocaleString('ru-RU')} ₽
                  </Badge>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={1000}
                  max={10000}
                  step={500}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 000 ₽</span>
                  <span>10 000 ₽</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calendar" size={20} />
                Выберите дату
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="Store" size={20} />
                  Доступные салоны
                </div>
                <Badge variant="secondary">{filteredSalons.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredSalons.length === 0 && (
                <div className="text-center py-8">
                  <Icon name="Store" size={48} className="mx-auto mb-3 text-muted-foreground opacity-50" />
                  <p className="text-sm text-muted-foreground mb-2">Салоны не найдены</p>
                  <p className="text-xs text-muted-foreground">Попробуйте увеличить бюджет</p>
                </div>
              )}

              {filteredSalons.map((salon) => {
                const serviceInfo = salon.services[selectedService as keyof typeof salon.services];
                
                return (
                  <Card
                    key={salon.id}
                    className={`border-2 overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                      selectedSalon?.id === salon.id ? 'border-primary ring-2 ring-primary/50' : ''
                    }`}
                    onClick={() => setSelectedSalon(salon)}
                  >
                    <div className="flex">
                      <img
                        src={salon.image}
                        alt={salon.name}
                        className="w-24 h-24 object-cover"
                      />
                      <div className="flex-1 p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-sm mb-1">{salon.name}</h4>
                            {salon.partner && (
                              <Badge className="bg-gradient-to-r from-primary to-secondary text-white text-xs">
                                <Icon name="Star" size={10} className="mr-1" />
                                Партнёр
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={14} className="text-yellow-500" />
                            <span className="text-sm font-bold">{salon.rating}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Icon name="MapPin" size={12} />
                            {salon.address}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Icon name="MessageCircle" size={12} />
                            {salon.reviews} отзывов
                          </p>
                          {serviceInfo && (
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                {serviceInfo.price}₽
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {serviceInfo.duration}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </CardContent>
          </Card>

          {selectedSalon && (
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Clock" size={20} />
                  Выберите время
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {selectedSalon.availableTimes.map((time: string) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedTime === time
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <p className="text-sm font-medium">{time}</p>
                    </button>
                  ))}
                </div>

                {selectedTime && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                    <h4 className="font-bold text-sm mb-2">Детали записи:</h4>
                    <div className="space-y-1 text-xs">
                      <p><span className="text-muted-foreground">Салон:</span> {selectedSalon.name}</p>
                      <p><span className="text-muted-foreground">Услуга:</span> {services.find(s => s.id === selectedService)?.name}</p>
                      <p><span className="text-muted-foreground">Дата:</span> {selectedDate?.toLocaleDateString('ru-RU')}</p>
                      <p><span className="text-muted-foreground">Время:</span> {selectedTime}</p>
                      <p><span className="text-muted-foreground">Стоимость:</span> {selectedSalon.services[selectedService as keyof typeof selectedSalon.services]?.price}₽</p>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full mt-4 bg-gradient-to-r from-primary to-secondary"
                  onClick={handleBooking}
                  disabled={!selectedTime}
                >
                  <Icon name="Check" size={18} className="mr-2" />
                  Подтвердить запись
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default BeautyBooking;
