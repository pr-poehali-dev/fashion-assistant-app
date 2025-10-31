import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const SavedLooks = () => {
  const navigate = useNavigate();
  const [selectedLook, setSelectedLook] = useState<number | null>(null);

  const looks = [
    {
      id: 1,
      title: 'Деловой образ',
      date: '28 октября 2024',
      score: 92,
      style: 'Business',
      occasion: 'Работа',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/8d0c4af5-d4b9-41e1-a04f-3ec85422380a.jpg',
      items: 3,
      favorite: true
    },
    {
      id: 2,
      title: 'Вечерний выход',
      date: '25 октября 2024',
      score: 95,
      style: 'Evening',
      occasion: 'Вечеринка',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/695e0ddb-c62f-4248-89d6-86349a7afb0f.jpg',
      items: 5,
      favorite: true
    },
    {
      id: 3,
      title: 'Casual повседневный',
      date: '22 октября 2024',
      score: 87,
      style: 'Casual',
      occasion: 'Прогулка',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/ba01e802-dc68-4510-8bbb-293f6c35d7d9.jpg',
      items: 4,
      favorite: false
    },
    {
      id: 4,
      title: 'Спортивный стиль',
      date: '20 октября 2024',
      score: 89,
      style: 'Sport',
      occasion: 'Спортзал',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/ba01e802-dc68-4510-8bbb-293f6c35d7d9.jpg',
      items: 3,
      favorite: false
    },
    {
      id: 5,
      title: 'Романтический образ',
      date: '18 октября 2024',
      score: 91,
      style: 'Romantic',
      occasion: 'Свидание',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/695e0ddb-c62f-4248-89d6-86349a7afb0f.jpg',
      items: 4,
      favorite: true
    },
    {
      id: 6,
      title: 'Street style',
      date: '15 октября 2024',
      score: 88,
      style: 'Street',
      occasion: 'Прогулка',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/ba01e802-dc68-4510-8bbb-293f6c35d7d9.jpg',
      items: 5,
      favorite: false
    }
  ];

  const allLooks = looks;
  const favoriteLooks = looks.filter(look => look.favorite);

  const LookCard = ({ look }: { look: typeof looks[0] }) => (
    <Card 
      className="border-0 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
      onClick={() => setSelectedLook(look.id)}
    >
      <div className="relative">
        <img 
          src={look.imageUrl} 
          alt={look.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge className="bg-black/70 text-white backdrop-blur">
            <Icon name="Sparkles" size={12} className="mr-1" />
            {look.score}
          </Badge>
          {look.favorite && (
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
              <Icon name="Heart" size={16} className="text-white fill-white" />
            </div>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1">{look.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{look.date}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">{look.style}</Badge>
            <Badge variant="secondary" className="text-xs">{look.occasion}</Badge>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Icon name="Shirt" size={14} />
            {look.items}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
          >
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Назад
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Filter" size={16} className="mr-2" />
            Фильтры
          </Button>
        </div>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary via-secondary to-accent text-white mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Мои образы</h1>
                <p className="text-white/90 text-sm">История сохранённых луков</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{looks.length}</div>
                <div className="text-xs text-white/80">образов</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Heart" size={20} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{favoriteLooks.length}</div>
                <div className="text-xs text-muted-foreground">Избранных</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Icon name="TrendingUp" size={20} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(looks.reduce((acc, look) => acc + look.score, 0) / looks.length)}
                </div>
                <div className="text-xs text-muted-foreground">Средний балл</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">95</div>
                <div className="text-xs text-muted-foreground">Лучший образ</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="w-full bg-white/80 backdrop-blur">
            <TabsTrigger value="all" className="flex-1">
              <Icon name="Grid3x3" size={16} className="mr-2" />
              Все образы ({allLooks.length})
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex-1">
              <Icon name="Heart" size={16} className="mr-2" />
              Избранное ({favoriteLooks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allLooks.map(look => (
                <LookCard key={look.id} look={look} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            {favoriteLooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteLooks.map(look => (
                  <LookCard key={look.id} look={look} />
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Icon name="Heart" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Нет избранных образов</h3>
                  <p className="text-sm text-muted-foreground">
                    Добавляйте образы в избранное, чтобы быстро находить их позже
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-pink-50 mt-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Icon name="Camera" size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Создай новый образ</p>
                <p className="text-xs text-muted-foreground">Загрузи фото и получи AI-анализ</p>
              </div>
              <Button 
                className="bg-gradient-to-r from-primary to-secondary"
                onClick={() => navigate('/')}
              >
                <Icon name="Plus" size={18} className="mr-2" />
                Создать
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SavedLooks;
