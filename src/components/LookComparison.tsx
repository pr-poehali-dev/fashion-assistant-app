import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface ComparisonItem {
  id: number;
  date: string;
  score: number;
  style: string;
  imageUrl: string;
}

interface LookComparisonProps {
  look1?: ComparisonItem;
  look2?: ComparisonItem;
  onClose?: () => void;
}

const LookComparison = ({ look1, look2, onClose }: LookComparisonProps) => {
  if (!look1 || !look2) return null;

  const scoreDiff = look2.score - look1.score;

  const criteria = [
    { name: 'Цветовая гармония', score1: 88, score2: 95 },
    { name: 'Соответствие случаю', score1: 92, score2: 90 },
    { name: 'Аксессуары', score1: 85, score2: 98 },
    { name: 'Силуэт', score1: 94, score2: 92 },
    { name: 'Обувь', score1: 90, score2: 96 }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon name="GitCompare" size={24} />
              Сравнение образов
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-2">
              <CardContent className="p-4">
                <img 
                  src={look1.imageUrl} 
                  alt="Образ 1"
                  className="w-full h-64 object-cover rounded-lg mb-3"
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{look1.date}</p>
                    <Badge className="bg-blue-500">{look1.score}</Badge>
                  </div>
                  <Badge variant="outline">{look1.style}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-4">
                <img 
                  src={look2.imageUrl} 
                  alt="Образ 2"
                  className="w-full h-64 object-cover rounded-lg mb-3"
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{look2.date}</p>
                    <Badge className="bg-green-500">{look2.score}</Badge>
                  </div>
                  <Badge variant="outline">{look2.style}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-2">
                <Icon name={scoreDiff > 0 ? 'TrendingUp' : scoreDiff < 0 ? 'TrendingDown' : 'Minus'} 
                      size={20} 
                      className={scoreDiff > 0 ? 'text-green-500' : scoreDiff < 0 ? 'text-red-500' : 'text-gray-500'} />
                <p className="text-lg font-semibold">
                  Разница: {Math.abs(scoreDiff)} {scoreDiff > 0 ? 'баллов в пользу второго образа' : scoreDiff < 0 ? 'баллов в пользу первого образа' : 'баллов (одинаково)'}
                </p>
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Icon name="BarChart3" size={18} />
              Детальное сравнение по критериям
            </h3>
            <div className="space-y-3">
              {criteria.map((criterion, idx) => {
                const diff = criterion.score2 - criterion.score1;
                return (
                  <Card key={idx} className="border">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">{criterion.name}</p>
                        <Badge 
                          variant="outline"
                          className={diff > 0 ? 'border-green-500 text-green-600' : diff < 0 ? 'border-red-500 text-red-600' : 'border-gray-500'}
                        >
                          {diff > 0 ? '+' : ''}{diff}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Образ 1</span>
                            <span className="font-semibold">{criterion.score1}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${criterion.score1}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Образ 2</span>
                            <span className="font-semibold">{criterion.score2}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${criterion.score2}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">AI рекомендация</h4>
                  <p className="text-xs text-muted-foreground">
                    {scoreDiff > 0 
                      ? `Второй образ лучше подходит для стиля "${look2.style}". Обрати внимание на аксессуары и цветовую гамму.`
                      : scoreDiff < 0 
                      ? `Первый образ выглядит более гармонично. Попробуй повторить удачные элементы в будущих луках.`
                      : 'Оба образа одинаково хороши! Выбери тот, который больше соответствует случаю.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Icon name="Download" size={16} className="mr-2" />
              Сохранить сравнение
            </Button>
            <Button variant="outline" className="flex-1">
              <Icon name="Share2" size={16} className="mr-2" />
              Поделиться
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LookComparison;
