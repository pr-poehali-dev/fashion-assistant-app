import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

const ImprovementSuggestions = () => {
  const suggestions = [
    {
      id: 1,
      category: 'Цвета',
      icon: 'Palette',
      priority: 'high',
      title: 'Попробуй более яркие акценты',
      description: 'Добавь элементы красного или оранжевого цвета для большей выразительности образа',
      impact: '+8 баллов',
      items: [
        { name: 'Красная сумка', price: '2 990 ₽', store: 'ZARA' },
        { name: 'Оранжевый шарф', price: '1 490 ₽', store: 'H&M' }
      ]
    },
    {
      id: 2,
      category: 'Аксессуары',
      icon: 'Watch',
      priority: 'medium',
      title: 'Дополни образ аксессуарами',
      description: 'Часы или браслет добавят завершённости деловому стилю',
      impact: '+5 баллов',
      items: [
        { name: 'Классические часы', price: '4 990 ₽', store: 'Mango' },
        { name: 'Минималистичный браслет', price: '890 ₽', store: 'H&M' }
      ]
    },
    {
      id: 3,
      category: 'Обувь',
      icon: 'Footprints',
      priority: 'medium',
      title: 'Измени обувь под случай',
      description: 'Для вечернего выхода лучше выбрать туфли на каблуке',
      impact: '+6 баллов',
      items: [
        { name: 'Туфли на каблуке', price: '5 990 ₽', store: 'ZARA' },
        { name: 'Элегантные босоножки', price: '6 490 ₽', store: 'Mango' }
      ]
    },
    {
      id: 4,
      category: 'Силуэт',
      icon: 'Shirt',
      priority: 'low',
      title: 'Поиграй с пропорциями',
      description: 'Oversize верх + облегающий низ создадут более модный силуэт',
      impact: '+4 балла',
      items: [
        { name: 'Oversize пиджак', price: '7 990 ₽', store: 'ZARA' },
        { name: 'Облегающие брюки', price: '3 990 ₽', store: 'Mango' }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Высокий приоритет';
      case 'medium': return 'Средний приоритет';
      case 'low': return 'Низкий приоритет';
      default: return 'Приоритет';
    }
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Lightbulb" size={20} />
          Предложения по улучшению
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Sparkles" size={18} className="text-primary" />
            <p className="text-sm font-semibold">AI рекомендует</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Следуя этим советам, ты можешь повысить оценку образа до <span className="font-bold text-primary">98 баллов</span>
          </p>
        </div>

        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id} className="border-2">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0`}>
                    <Icon name={suggestion.icon as any} size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <Badge variant="outline" className="text-xs mb-2">
                          {suggestion.category}
                        </Badge>
                        <h4 className="font-semibold text-sm">{suggestion.title}</h4>
                      </div>
                      <Badge className={getPriorityColor(suggestion.priority)}>
                        {suggestion.impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {suggestion.description}
                    </p>

                    <Separator className="my-3" />

                    <div className="space-y-2">
                      <p className="text-xs font-medium flex items-center gap-1">
                        <Icon name="ShoppingBag" size={12} />
                        Рекомендуемые товары:
                      </p>
                      {suggestion.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                          <div>
                            <p className="text-xs font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.store}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold">{item.price}</p>
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              <Icon name="ExternalLink" size={12} className="mr-1" />
                              Купить
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  <Icon name="Check" size={14} className="mr-2" />
                  Применить рекомендацию
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <Icon name="Trophy" size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Цель недели</p>
                <p className="text-xs text-muted-foreground">Достичь среднего балла 95+</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">92</p>
                <p className="text-xs text-muted-foreground">сейчас</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ImprovementSuggestions;
