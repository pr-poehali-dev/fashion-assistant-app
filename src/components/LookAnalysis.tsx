import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface LookAnalysisProps {
  imageUrl: string;
}

const LookAnalysis = ({ imageUrl }: LookAnalysisProps) => {
  const [showFavoriteDialog, setShowFavoriteDialog] = useState(false);
  const [favoriteNotes, setFavoriteNotes] = useState('');
  const [favoriteTags, setFavoriteTags] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const analysisData = {
    overallScore: 87,
    style: 'Casual Chic',
    occasion: 'Повседневный',
    colors: ['Черный', 'Белый', 'Бежевый'],
    strengths: [
      'Гармоничное сочетание цветов',
      'Подходящий силуэт',
      'Актуальные тренды'
    ],
    improvements: [
      'Добавь акцентные аксессуары',
      'Попробуй более яркую обувь'
    ]
  };

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg overflow-hidden">
        <img 
          src={imageUrl} 
          alt="Uploaded look" 
          className="w-full h-64 object-cover"
        />
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Icon name="Sparkles" size={20} />
              AI Оценка образа
            </span>
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {analysisData.overallScore}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Общая оценка</span>
              <span className="font-medium">{analysisData.overallScore}/100</span>
            </div>
            <Progress value={analysisData.overallScore} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Стиль</p>
              <Badge variant="secondary" className="text-sm">
                {analysisData.style}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Повод</p>
              <Badge variant="secondary" className="text-sm">
                {analysisData.occasion}
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Цветовая палитра</p>
            <div className="flex gap-2">
              {analysisData.colors.map((color, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {color}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <Icon name="ThumbsUp" size={20} />
            Сильные стороны
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysisData.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <Icon name="Lightbulb" size={20} />
            Рекомендации
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysisData.improvements.map((improvement, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Icon name="ArrowRight" size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm">{improvement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant={isFavorite ? "default" : "outline"} 
          className="w-full"
          onClick={() => setShowFavoriteDialog(true)}
        >
          <Icon name="Heart" size={18} className={`mr-2 ${isFavorite ? 'fill-white' : ''}`} />
          {isFavorite ? 'В избранном' : 'Сохранить'}
        </Button>
        <Button className="w-full bg-gradient-to-r from-primary to-secondary">
          <Icon name="ShoppingBag" size={18} className="mr-2" />
          Подобрать одежду
        </Button>
      </div>

      <Dialog open={showFavoriteDialog} onOpenChange={setShowFavoriteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Heart" size={20} className="text-red-500" />
              Добавить в избранное
            </DialogTitle>
            <DialogDescription>
              Добавь заметки и теги для быстрого поиска этого образа
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Заметки (необязательно)</Label>
              <Textarea
                id="notes"
                placeholder="Например: Идеально для офиса"
                value={favoriteNotes}
                onChange={(e) => setFavoriteNotes(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Теги (через запятую)</Label>
              <Input
                id="tags"
                placeholder="офис, встречи, деловой"
                value={favoriteTags}
                onChange={(e) => setFavoriteTags(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Примеры: #работа #свидание #спорт #вечер
              </p>
            </div>
            <Card className="border-0 bg-gradient-to-br from-pink-50 to-rose-50">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <Icon name="Info" size={14} className="mt-0.5 text-primary" />
                  <p className="text-xs text-muted-foreground">
                    Используй теги для группировки образов по случаям и быстрого поиска
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFavoriteDialog(false)}>
              Отмена
            </Button>
            <Button 
              onClick={() => {
                setIsFavorite(true);
                setShowFavoriteDialog(false);
                console.log('Saved to favorites:', { notes: favoriteNotes, tags: favoriteTags });
              }}
            >
              <Icon name="Heart" size={16} className="mr-2" />
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LookAnalysis;