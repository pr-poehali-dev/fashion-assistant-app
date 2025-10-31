import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

const StoreList = () => {
  const [budget, setBudget] = useState<number[]>([50000]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [stores] = useState([
    {
      id: 1,
      name: 'ZARA',
      category: 'Fashion',
      discount: '20%',
      delivery: 'Бесплатная доставка',
      priceRange: { min: 2000, max: 15000 },
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg'
    },
    {
      id: 2,
      name: 'H&M',
      category: 'Casual',
      discount: '15%',
      delivery: '2-3 дня',
      priceRange: { min: 1000, max: 10000 },
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg'
    },
    {
      id: 3,
      name: 'Mango',
      category: 'Premium',
      discount: '25%',
      delivery: 'Экспресс доставка',
      priceRange: { min: 3000, max: 25000 },
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg'
    },
    {
      id: 4,
      name: 'Lamoda',
      category: 'Fashion',
      discount: '30%',
      delivery: 'Бесплатная доставка от 2500₽',
      priceRange: { min: 1500, max: 20000 },
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg'
    },
    {
      id: 5,
      name: 'Nike',
      category: 'Sport',
      discount: '10%',
      delivery: 'Экспресс доставка',
      priceRange: { min: 5000, max: 30000 },
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg'
    },
    {
      id: 6,
      name: 'Reserved',
      category: 'Casual',
      discount: '20%',
      delivery: '1-2 дня',
      priceRange: { min: 2500, max: 18000 },
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg'
    },
    {
      id: 7,
      name: 'COS',
      category: 'Premium',
      discount: '15%',
      delivery: 'Бесплатная доставка',
      priceRange: { min: 8000, max: 50000 },
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg'
    },
    {
      id: 8,
      name: 'Befree',
      category: 'Fashion',
      discount: '25%',
      delivery: '2-4 дня',
      priceRange: { min: 1000, max: 8000 },
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg'
    }
  ]);

  const filteredStores = stores.filter(store => {
    const categoryMatch = selectedCategory === 'Все' || store.category === selectedCategory;
    const budgetMatch = store.priceRange.min <= budget[0] && store.priceRange.max >= budget[0] / 3;
    return categoryMatch && budgetMatch;
  });

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Store" size={20} />
            Партнёрские магазины
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Wallet" size={16} />
                  Бюджет на образ
                </p>
                <Badge variant="secondary" className="font-mono">
                  {budget[0].toLocaleString('ru-RU')} ₽
                </Badge>
              </div>
              <Slider
                value={budget}
                onValueChange={setBudget}
                min={5000}
                max={200000}
                step={5000}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 000 ₽</span>
                <span>200 000 ₽</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Icon name="Info" size={12} />
              Показываем магазины с товарами в вашем бюджете
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {['Все', 'Fashion', 'Premium', 'Sport', 'Casual'].map((category) => (
              <Badge 
                key={category} 
                variant={selectedCategory === category ? "default" : "outline"}
                className="whitespace-nowrap cursor-pointer hover:bg-primary hover:text-white transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {filteredStores.length === 0 && (
            <div className="text-center py-8">
              <Icon name="Store" size={48} className="mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground mb-2">Магазинов не найдено</p>
              <p className="text-xs text-muted-foreground">Попробуйте изменить бюджет или категорию</p>
            </div>
          )}

          <div className="space-y-3">
            {filteredStores.map((store) => (
              <Card key={store.id} className="border-2 overflow-hidden hover:shadow-lg transition-all">
                <div className="flex">
                  <img 
                    src={store.image} 
                    alt={store.name}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1 p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{store.name}</h3>
                        <div className="flex gap-1 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {store.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {store.priceRange.min.toLocaleString('ru-RU')}–{store.priceRange.max.toLocaleString('ru-RU')} ₽
                          </Badge>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                        -{store.discount}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <Icon name="Truck" size={12} />
                      {store.delivery}
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <Icon name="ExternalLink" size={14} className="mr-1" />
                      Перейти в магазин
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Icon name="Truck" size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Трекинг доставки</p>
              <p className="text-xs text-muted-foreground">Отслеживай заказы в реальном времени</p>
            </div>
            <Button size="sm" variant="outline">
              Заказы
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreList;