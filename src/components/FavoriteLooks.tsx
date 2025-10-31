import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface FavoriteLook {
  id: number;
  date: string;
  score: number;
  style: string;
  imageUrl: string;
  notes?: string;
  tags: string[];
}

interface FavoriteLooksProps {
  onSelectLook?: (imageUrl: string) => void;
}

const FavoriteLooks = ({ onSelectLook }: FavoriteLooksProps) => {
  const [favorites, setFavorites] = useState<FavoriteLook[]>([
    {
      id: 1,
      date: '30 октября, 18:45',
      score: 95,
      style: 'Evening',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/695e0ddb-c62f-4248-89d6-86349a7afb0f.jpg',
      notes: 'Идеально для свидания',
      tags: ['романтика', 'вечер', 'ресторан']
    },
    {
      id: 2,
      date: '31 октября, 14:30',
      score: 92,
      style: 'Business',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/8d0c4af5-d4b9-41e1-a04f-3ec85422380a.jpg',
      notes: 'Деловые встречи',
      tags: ['офис', 'переговоры']
    },
  ]);

  const [filterTag, setFilterTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(favorites.flatMap(f => f.tags)));

  const filteredFavorites = filterTag 
    ? favorites.filter(f => f.tags.includes(filterTag))
    : favorites;

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  const getStyleIcon = (style: string) => {
    switch (style) {
      case 'Business': return 'Briefcase';
      case 'Evening': return 'Moon';
      case 'Casual': return 'Coffee';
      case 'Sport': return 'Dumbbell';
      default: return 'Sparkles';
    }
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon name="Heart" size={20} className="text-red-500" />
            Избранные образы
            <Badge variant="outline">{favorites.length}</Badge>
          </CardTitle>
          <Button variant="outline" size="sm">
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить текущий
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {allTags.length > 0 && (
          <div>
            <p className="text-xs font-medium mb-2 flex items-center gap-2">
              <Icon name="Filter" size={12} />
              Фильтр по тегам:
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={filterTag === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setFilterTag(null)}
              >
                Все
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={filterTag === tag ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setFilterTag(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {filteredFavorites.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="p-8 text-center">
              <Icon name="Heart" size={48} className="mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm font-medium mb-2">Нет избранных образов</p>
              <p className="text-xs text-muted-foreground">
                Сохраняй понравившиеся образы, чтобы быстро найти их потом
              </p>
            </CardContent>
          </Card>
        ) : (
          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFavorites.map((favorite) => (
                <Card 
                  key={favorite.id} 
                  className="border-2 hover:shadow-lg transition-all overflow-hidden group"
                >
                  <div className="relative">
                    <img 
                      src={favorite.imageUrl} 
                      alt={`Образ ${favorite.id}`}
                      className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform"
                      onClick={() => onSelectLook?.(favorite.imageUrl)}
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge className="bg-black/70 backdrop-blur-sm">
                        {favorite.score}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFavorite(favorite.id);
                        }}
                      >
                        <Icon name="Heart" size={16} className="text-red-500 fill-red-500" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Icon name={getStyleIcon(favorite.style) as any} size={12} />
                        {favorite.style}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Icon name="Calendar" size={10} />
                          {favorite.date}
                        </p>
                      </div>
                      
                      {favorite.notes && (
                        <p className="text-xs italic text-muted-foreground">
                          "{favorite.notes}"
                        </p>
                      )}

                      {favorite.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {favorite.tags.map((tag, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                              onClick={() => setFilterTag(tag)}
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 h-8 text-xs"
                          onClick={() => onSelectLook?.(favorite.imageUrl)}
                        >
                          <Icon name="Eye" size={12} className="mr-1" />
                          Открыть
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 h-8 text-xs"
                        >
                          <Icon name="Share2" size={12} className="mr-1" />
                          Поделиться
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}

        <Card className="border-0 bg-gradient-to-br from-pink-50 to-rose-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Icon name="Lightbulb" size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Совет</p>
                <p className="text-xs text-muted-foreground">
                  Используй теги для быстрого поиска образов по случаю: #работа, #свидание, #спорт
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default FavoriteLooks;
