import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface WardrobeItem {
  id: number;
  name: string;
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';
  imageUrl: string;
  color: string;
  brand: string;
  price: string;
}

interface Capsule {
  id: number;
  name: string;
  season: string;
  occasion: string;
  items: WardrobeItem[];
  combinations: number;
  createdAt: string;
}

const CapsuleWardrobe = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showItemsDialog, setShowItemsDialog] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);
  const [newCapsuleName, setNewCapsuleName] = useState('');
  const [newCapsuleSeason, setNewCapsuleSeason] = useState('');
  const [newCapsuleOccasion, setNewCapsuleOccasion] = useState('');

  const [capsules, setCapsules] = useState<Capsule[]>([
    {
      id: 1,
      name: 'Деловой стиль',
      season: 'Весна/Осень',
      occasion: 'Работа',
      items: [],
      combinations: 12,
      createdAt: '15 окт 2024'
    },
    {
      id: 2,
      name: 'Casual Weekend',
      season: 'Лето',
      occasion: 'Прогулки',
      items: [],
      combinations: 8,
      createdAt: '20 окт 2024'
    }
  ]);

  const availableItems: WardrobeItem[] = [
    {
      id: 1,
      name: 'Белая блузка',
      category: 'tops',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/8d0c4af5-d4b9-41e1-a04f-3ec85422380a.jpg',
      color: 'Белый',
      brand: 'ZARA',
      price: '2 999 ₽'
    },
    {
      id: 2,
      name: 'Черные брюки',
      category: 'bottoms',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/695e0ddb-c62f-4248-89d6-86349a7afb0f.jpg',
      color: 'Черный',
      brand: 'Mango',
      price: '3 999 ₽'
    },
    {
      id: 3,
      name: 'Джинсы',
      category: 'bottoms',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/ba01e802-dc68-4510-8bbb-293f6c35d7d9.jpg',
      color: 'Синий',
      brand: 'H&M',
      price: '2 499 ₽'
    },
    {
      id: 4,
      name: 'Платье',
      category: 'dresses',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/695e0ddb-c62f-4248-89d6-86349a7afb0f.jpg',
      color: 'Бежевый',
      brand: 'ZARA',
      price: '4 999 ₽'
    },
    {
      id: 5,
      name: 'Пиджак',
      category: 'outerwear',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/8d0c4af5-d4b9-41e1-a04f-3ec85422380a.jpg',
      color: 'Черный',
      brand: 'Massimo Dutti',
      price: '8 990 ₽'
    },
    {
      id: 6,
      name: 'Туфли',
      category: 'shoes',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/ba01e802-dc68-4510-8bbb-293f6c35d7d9.jpg',
      color: 'Черный',
      brand: 'ZARA',
      price: '4 999 ₽'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tops': return 'Shirt';
      case 'bottoms': return 'PanelsTopLeft';
      case 'dresses': return 'Watch';
      case 'outerwear': return 'Coat';
      case 'shoes': return 'Footprints';
      case 'accessories': return 'Watch';
      default: return 'Package';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'tops': return 'Верх';
      case 'bottoms': return 'Низ';
      case 'dresses': return 'Платья';
      case 'outerwear': return 'Верхняя одежда';
      case 'shoes': return 'Обувь';
      case 'accessories': return 'Аксессуары';
      default: return category;
    }
  };

  const handleCreateCapsule = () => {
    const newCapsule: Capsule = {
      id: Date.now(),
      name: newCapsuleName,
      season: newCapsuleSeason,
      occasion: newCapsuleOccasion,
      items: [],
      combinations: 0,
      createdAt: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setCapsules([...capsules, newCapsule]);
    setShowCreateDialog(false);
    setNewCapsuleName('');
    setNewCapsuleSeason('');
    setNewCapsuleOccasion('');
  };

  const deleteCapsule = (id: number) => {
    setCapsules(capsules.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon name="Package" size={20} />
              Капсульные гардеробы
            </CardTitle>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Icon name="Plus" size={16} className="mr-2" />
              Создать капсулу
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 mb-4">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Что такое капсула?</p>
                  <p className="text-xs text-muted-foreground">
                    Это набор базовых вещей (10-20 шт), которые идеально сочетаются друг с другом, 
                    создавая множество готовых образов для разных случаев
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {capsules.length === 0 ? (
            <Card className="border-2 border-dashed">
              <CardContent className="p-8 text-center">
                <Icon name="Package" size={48} className="mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium mb-2">Нет капсульных гардеробов</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Создай свою первую капсулу для удобного планирования образов
                </p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать первую капсулу
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {capsules.map((capsule) => (
                <Card key={capsule.id} className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-2">{capsule.name}</h3>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              <Icon name="Calendar" size={10} className="mr-1" />
                              {capsule.season}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Icon name="Target" size={10} className="mr-1" />
                              {capsule.occasion}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteCapsule(capsule.id)}
                        >
                          <Icon name="Trash2" size={16} className="text-red-500" />
                        </Button>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-2xl font-bold text-primary">{capsule.items.length}</p>
                          <p className="text-xs text-muted-foreground">вещей</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-secondary">{capsule.combinations}</p>
                          <p className="text-xs text-muted-foreground">образов</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-accent">~2</p>
                          <p className="text-xs text-muted-foreground">недели</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedCapsule(capsule);
                            setShowItemsDialog(true);
                          }}
                        >
                          <Icon name="Eye" size={14} className="mr-2" />
                          Открыть
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                        >
                          <Icon name="Plus" size={14} className="mr-2" />
                          Добавить вещи
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground text-center">
                        Создана {capsule.createdAt}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="ShoppingBag" size={20} />
            Доступные вещи для капсулы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Вещи из избранного и найденные в поиске
          </p>
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-2 gap-3">
              {availableItems.map((item) => (
                <Card key={item.id} className="border-2 hover:shadow-md transition-all">
                  <CardContent className="p-3">
                    <img 
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">{item.name}</p>
                          <Badge variant="outline" className="text-xs mb-1">
                            <Icon name={getCategoryIcon(item.category) as any} size={10} className="mr-1" />
                            {getCategoryName(item.category)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{item.brand}</span>
                        <span className="font-semibold">{item.price}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full h-7 text-xs">
                        <Icon name="Plus" size={12} className="mr-1" />
                        В капсулу
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <Icon name="Lightbulb" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Рекомендации по капсуле</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 3-5 верха (блузки, футболки, свитера)</li>
                <li>• 2-3 низа (брюки, юбки, джинсы)</li>
                <li>• 1-2 платья</li>
                <li>• 2-3 пары обуви</li>
                <li>• Базовые аксессуары</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Package" size={20} />
              Создать капсульный гардероб
            </DialogTitle>
            <DialogDescription>
              Задай параметры для новой капсулы
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название капсулы</Label>
              <Input
                id="name"
                placeholder="Например: Деловой стиль"
                value={newCapsuleName}
                onChange={(e) => setNewCapsuleName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="season">Сезон</Label>
              <Select value={newCapsuleSeason} onValueChange={setNewCapsuleSeason}>
                <SelectTrigger>
                  <SelectValue placeholder="Выбери сезон" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Весна">Весна</SelectItem>
                  <SelectItem value="Лето">Лето</SelectItem>
                  <SelectItem value="Осень">Осень</SelectItem>
                  <SelectItem value="Зима">Зима</SelectItem>
                  <SelectItem value="Весна/Осень">Весна/Осень</SelectItem>
                  <SelectItem value="Всесезонная">Всесезонная</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="occasion">Случай</Label>
              <Select value={newCapsuleOccasion} onValueChange={setNewCapsuleOccasion}>
                <SelectTrigger>
                  <SelectValue placeholder="Выбери случай" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Работа">Работа</SelectItem>
                  <SelectItem value="Прогулки">Прогулки</SelectItem>
                  <SelectItem value="Вечерние выходы">Вечерние выходы</SelectItem>
                  <SelectItem value="Спорт">Спорт</SelectItem>
                  <SelectItem value="Путешествия">Путешествия</SelectItem>
                  <SelectItem value="Универсальная">Универсальная</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Отмена
            </Button>
            <Button 
              onClick={handleCreateCapsule}
              disabled={!newCapsuleName || !newCapsuleSeason || !newCapsuleOccasion}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showItemsDialog} onOpenChange={setShowItemsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Package" size={20} />
              {selectedCapsule?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedCapsule?.season} • {selectedCapsule?.occasion}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-3">
                <div className="flex items-center justify-around text-center">
                  <div>
                    <p className="text-xl font-bold text-primary">{selectedCapsule?.items.length || 0}</p>
                    <p className="text-xs text-muted-foreground">вещей</p>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div>
                    <p className="text-xl font-bold text-secondary">{selectedCapsule?.combinations || 0}</p>
                    <p className="text-xs text-muted-foreground">образов</p>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div>
                    <p className="text-xl font-bold text-accent">~2</p>
                    <p className="text-xs text-muted-foreground">недели без повторов</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedCapsule && selectedCapsule.items.length === 0 ? (
              <Card className="border-2 border-dashed">
                <CardContent className="p-8 text-center">
                  <Icon name="ShoppingBag" size={48} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium mb-2">Капсула пока пуста</p>
                  <p className="text-xs text-muted-foreground">
                    Добавь вещи из доступных или найденных в поиске
                  </p>
                </CardContent>
              </Card>
            ) : (
              <ScrollArea className="h-[300px]">
                <div className="grid grid-cols-3 gap-2">
                  {selectedCapsule?.items.map((item) => (
                    <Card key={item.id} className="border">
                      <CardContent className="p-2">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-20 object-cover rounded" />
                        <p className="text-xs font-medium mt-1 truncate">{item.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowItemsDialog(false)}>
              Закрыть
            </Button>
            <Button>
              <Icon name="Shuffle" size={16} className="mr-2" />
              Создать образы
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CapsuleWardrobe;
