import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AnalysisHistoryProps {
  onSelectAnalysis?: (imageUrl: string) => void;
}

const AnalysisHistory = ({ onSelectAnalysis }: AnalysisHistoryProps) => {
  const history = [
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

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="History" size={20} />
          История анализов
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {history.map((item) => (
              <Card 
                key={item.id} 
                className="border-2 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onSelectAnalysis?.(item.imageUrl)}
              >
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <img 
                      src={item.imageUrl} 
                      alt={`Анализ ${item.id}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
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
  );
};

export default AnalysisHistory;
