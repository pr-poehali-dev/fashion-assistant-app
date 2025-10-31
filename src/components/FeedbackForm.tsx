import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const FeedbackForm = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      toast({
        title: 'Заполните все поля',
        description: 'Пожалуйста, укажите название и описание предложения',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: 'Предложение отправлено!',
        description: 'Спасибо! Мы рассмотрим ваше предложение. При принятии вы получите месяц подписки.',
      });
      setTitle('');
      setDescription('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <Icon name="Lightbulb" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Бонус за идеи!</h3>
              <p className="text-sm text-muted-foreground">
                Предложите улучшение для приложения. Если ваша идея будет принята, получите месяц Premium подписки бесплатно!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="MessageSquarePlus" size={20} />
            Предложение по улучшению
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Название предложения
            </label>
            <Input
              placeholder="Например: Добавить темную тему"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Описание
            </label>
            <Textarea
              placeholder="Опишите ваше предложение подробнее..."
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button
            className="w-full bg-gradient-to-r from-primary to-secondary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <Icon name="Send" size={18} className="mr-2" />
            {isSubmitting ? 'Отправка...' : 'Отправить предложение'}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Star" size={20} className="text-yellow-500" />
            Принятые предложения
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { user: 'Мария К.', idea: 'Календарь событий с подбором образов', status: 'Реализовано' },
            { user: 'Дмитрий П.', idea: 'Фильтр по бюджету в магазинах', status: 'Реализовано' },
            { user: 'Елена С.', idea: 'Поиск вещей по фото', status: 'В разработке' }
          ].map((item, index) => (
            <div key={index} className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium">{item.idea}</p>
                <Icon name="CheckCircle" size={16} className="text-green-600 flex-shrink-0 ml-2" />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">{item.user}</p>
                <span className="text-xs">•</span>
                <p className="text-xs text-green-600 font-medium">{item.status}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackForm;
