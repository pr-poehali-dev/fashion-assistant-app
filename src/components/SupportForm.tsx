import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const SupportForm = () => {
  const { toast } = useToast();
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!category || !subject.trim() || !message.trim()) {
      toast({
        title: 'Заполните все поля',
        description: 'Пожалуйста, выберите категорию и опишите проблему',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: 'Обращение отправлено!',
        description: 'Мы ответим вам в течение 24 часов',
      });
      setCategory('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Icon name="HeadphonesIcon" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Мы на связи!</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Возникла проблема? Наша поддержка работает 24/7 и ответит в течение суток.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>Ответ в течение 24ч</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Icon name="Mail" size={12} />
                  <span>support@styleai.com</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="MessageCircleQuestion" size={20} />
            Обращение в поддержку
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Категория проблемы
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Технические проблемы</SelectItem>
                <SelectItem value="payment">Оплата и подписка</SelectItem>
                <SelectItem value="features">Работа функций</SelectItem>
                <SelectItem value="account">Аккаунт и профиль</SelectItem>
                <SelectItem value="partnership">Партнёрство</SelectItem>
                <SelectItem value="other">Другое</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Тема обращения
            </label>
            <Input
              placeholder="Кратко опишите проблему"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Подробное описание
            </label>
            <Textarea
              placeholder="Расскажите подробнее о проблеме, что произошло и когда..."
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <Icon name="Send" size={18} className="mr-2" />
            {isSubmitting ? 'Отправка...' : 'Отправить обращение'}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BookOpen" size={20} />
            Частые вопросы
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              question: 'Как работает AI-анализ образа?',
              answer: 'Загрузите фото, и AI оценит стиль, цветовую гамму и предложит улучшения',
              icon: 'ScanFace'
            },
            {
              question: 'Как отменить подписку?',
              answer: 'Перейдите в Профиль → Подписка и оплата → Отменить подписку',
              icon: 'CreditCard'
            },
            {
              question: 'Можно ли сохранить образы?',
              answer: 'Да, нажмите на сердечко рядом с образом, чтобы добавить в избранное',
              icon: 'Heart'
            }
          ].map((faq, index) => (
            <div key={index} className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name={faq.icon as any} size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">{faq.question}</p>
                  <p className="text-xs text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="MessageCircle" size={20} />
            Другие способы связи
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Mail" size={18} className="mr-3" />
            support@styleai.com
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="MessageCircle" size={18} className="mr-3" />
            Telegram: @styleai_support
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Phone" size={18} className="mr-3" />
            +7 (495) 123-45-67
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportForm;
