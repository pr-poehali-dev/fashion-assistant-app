import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

const StoreList = () => {
  const [stores] = useState([
    {
      id: 1,
      name: 'ZARA',
      category: 'Fashion',
      discount: '20%',
      delivery: 'Бесплатная доставка',
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg'
    },
    {
      id: 2,
      name: 'H&M',
      category: 'Casual',
      discount: '15%',
      delivery: '2-3 дня',
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg'
    },
    {
      id: 3,
      name: 'Mango',
      category: 'Premium',
      discount: '25%',
      delivery: 'Экспресс доставка',
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg'
    }
  ]);

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
          <div className="relative mb-4">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск магазина..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {['Все', 'Fashion', 'Premium', 'Sport', 'Casual'].map((category) => (
              <Badge key={category} variant="outline" className="whitespace-nowrap cursor-pointer hover:bg-primary hover:text-white transition-colors">
                {category}
              </Badge>
            ))}
          </div>

          <div className="space-y-3">
            {stores.map((store) => (
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
                        <Badge variant="secondary" className="text-xs mt-1">
                          {store.category}
                        </Badge>
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
