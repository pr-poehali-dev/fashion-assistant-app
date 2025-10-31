import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import LookComparison from './LookComparison';

interface AnalysisHistoryProps {
  onSelectAnalysis?: (imageUrl: string) => void;
}

interface HistoryItem {
  id: number;
  date: string;
  score: number;
  style: string;
  imageUrl: string;
}

const AnalysisHistory = ({ onSelectAnalysis }: AnalysisHistoryProps) => {
  const [selectedForComparison, setSelectedForComparison] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const history: HistoryItem[] = [
    {
      id: 1,
      date: '31 октября, 14:30',
      score: 92,
      style: 'Business',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/8d0c4af5-d4b9-41e1-a04f-3ec85422380a.jpg'
    },
    {
      id: 2,
      date: '30 октября, 18:45',
      score: 95,
      style: 'Evening',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/695e0ddb-c62f-4248-89d6-86349a7afb0f.jpg'
    },
    {
      id: 3,
      date: '29 октября, 10:20',
      score: 87,
      style: 'Casual',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/ba01e802-dc68-4510-8bbb-293f6c35d7d9.jpg'
    },
    {
      id: 4,
      date: '28 октября, 16:00',
      score: 89,
      style: 'Sport',
      imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/ba01e802-dc68-4510-8bbb-293f6c35d7d9.jpg'
    }
  ];

  const handleComparisonToggle = (id: number) => {
    setSelectedForComparison(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      }
      if (prev.length < 2) {
        return [...prev, id];
      }
      return [prev[1], id];
    });
  };

  const handleCompare = () => {
    if (selectedForComparison.length === 2) {
      setShowComparison(true);
    }
  };

  const getSelectedLooks = () => {
    const look1 = history.find(h => h.id === selectedForComparison[0]);
    const look2 = history.find(h => h.id === selectedForComparison[1]);
    return { look1, look2 };
  };

  const { look1, look2 } = getSelectedLooks();

  return (
    <>
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon name="History" size={20} />
              История анализов
            </CardTitle>
            {selectedForComparison.length > 0 && (
              <Button 
                size="sm" 
                variant={selectedForComparison.length === 2 ? 'default' : 'outline'}
                disabled={selectedForComparison.length !== 2}
                onClick={handleCompare}
              >
                <Icon name="GitCompare" size={16} className="mr-2" />
                Сравнить ({selectedForComparison.length}/2)
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {selectedForComparison.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 flex items-center gap-2">
                <Icon name="Info" size={14} />
                {selectedForComparison.length === 1 
                  ? 'Выбери ещё один образ для сравнения' 
                  : 'Нажми кнопку "Сравнить" для детального анализа'}
              </p>
            </div>
          )}

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {history.map((item) => (
                <Card 
                  key={item.id} 
                  className={`border-2 hover:shadow-md transition-all ${
                    selectedForComparison.includes(item.id) ? 'border-primary' : ''
                  }`}
                >
                  <CardContent className="p-3">
                    <div className="flex gap-3">
                      <div className="relative">
                        <img 
                          src={item.imageUrl} 
                          alt={`Анализ ${item.id}`}
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                          onClick={() => onSelectAnalysis?.(item.imageUrl)}
                        />
                        <div 
                          className="absolute -top-2 -left-2 z-10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            checked={selectedForComparison.includes(item.id)}
                            onCheckedChange={() => handleComparisonToggle(item.id)}
                            className="bg-white border-2"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium">{item.date}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {item.style}
                            </Badge>
                          </div>
                          <Badge 
                            className={`${
                              item.score >= 90 
                                ? 'bg-green-500' 
                                : item.score >= 80 
                                ? 'bg-blue-500' 
                                : 'bg-orange-500'
                            }`}
                          >
                            {item.score}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectAnalysis?.(item.imageUrl);
                            }}
                          >
                            <Icon name="Eye" size={14} className="mr-1" />
                            Посмотреть
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleComparisonToggle(item.id);
                            }}
                          >
                            <Icon name="GitCompare" size={14} className="mr-1" />
                            {selectedForComparison.includes(item.id) ? 'Убрать' : 'Сравнить'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-4 p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" size={16} className="text-primary" />
              <p className="text-xs text-muted-foreground">
                Средняя оценка за неделю: <span className="font-semibold text-foreground">90.8</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {showComparison && (
        <LookComparison 
          look1={look1}
          look2={look2}
          onClose={() => {
            setShowComparison(false);
            setSelectedForComparison([]);
          }}
        />
      )}
    </>
  );
};

export default AnalysisHistory;