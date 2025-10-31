import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

const StyleSelector = () => {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const styles = [
    { name: 'Casual', icon: 'Shirt', color: 'from-blue-400 to-blue-600' },
    { name: 'Business', icon: 'Briefcase', color: 'from-gray-400 to-gray-600' },
    { name: 'Sport', icon: 'Dumbbell', color: 'from-green-400 to-green-600' },
    { name: 'Evening', icon: 'Sparkles', color: 'from-purple-400 to-purple-600' },
    { name: 'Street', icon: 'Flame', color: 'from-orange-400 to-orange-600' },
    { name: 'Romantic', icon: 'Heart', color: 'from-pink-400 to-pink-600' },
  ];

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Palette" size={20} />
          Выбери стиль
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {styles.map((style) => (
            <button
              key={style.name}
              onClick={() => setSelectedStyle(style.name)}
              className={`relative aspect-square rounded-xl bg-gradient-to-br ${style.color} p-4 flex flex-col items-center justify-center text-white transition-all ${
                selectedStyle === style.name 
                  ? 'ring-4 ring-primary scale-95' 
                  : 'hover:scale-105'
              }`}
            >
              <Icon name={style.icon as any} size={32} className="mb-2" />
              <span className="text-xs font-medium">{style.name}</span>
              {selectedStyle === style.name && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} />
                </div>
              )}
            </button>
          ))}
        </div>

        {selectedStyle && (
          <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
            <p className="text-sm font-medium mb-2">Стиль: {selectedStyle}</p>
            <p className="text-xs text-muted-foreground">
              AI подберёт образы в этом стиле из наших партнёрских магазинов
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StyleSelector;
