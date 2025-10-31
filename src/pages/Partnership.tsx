import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Partnership = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    storeCount: '',
    category: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время',
    });
    setTimeout(() => navigate('/'), 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={18} className="mr-2" />
          Назад
        </Button>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary via-secondary to-accent text-white mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <Icon name="Handshake" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Станьте партнёром</h1>
                <p className="text-white/90 text-sm">Присоединяйтесь к StyleAI</p>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Получите доступ к 50,000+ активных пользователей и увеличьте продажи с помощью AI-технологий
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Gift" size={20} />
              Преимущества партнёрства
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 p-3 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg">
                <Icon name="TrendingUp" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Рост продаж</p>
                  <p className="text-xs text-muted-foreground">AI-рекомендации увеличивают конверсию на 40%</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-gradient-to-br from-purple-50 to-orange-50 rounded-lg">
                <Icon name="Users" size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Целевая аудитория</p>
                  <p className="text-xs text-muted-foreground">50,000+ активных пользователей ежемесячно</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-gradient-to-br from-orange-50 to-pink-50 rounded-lg">
                <Icon name="BarChart3" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Аналитика</p>
                  <p className="text-xs text-muted-foreground">Детальная статистика продаж в реальном времени</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg">
                <Icon name="Zap" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Быстрая интеграция</p>
                  <p className="text-xs text-muted-foreground">Подключение за 24 часа</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Заявка на партнёрство</CardTitle>
            <CardDescription>Заполните форму, и мы свяжемся с вами в течение 24 часов</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">
                  Название компании <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  placeholder="ООО 'Fashion Store'"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">
                  Контактное лицо <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactPerson"
                  placeholder="Иван Иванов"
                  value={formData.contactPerson}
                  onChange={(e) => handleChange('contactPerson', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="info@company.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Телефон <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Сайт компании</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://yourstore.com"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Категория товаров</Label>
                  <Input
                    id="category"
                    placeholder="Например: Casual, Premium, Sport"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeCount">Количество магазинов</Label>
                  <Input
                    id="storeCount"
                    type="number"
                    placeholder="5"
                    value={formData.storeCount}
                    onChange={(e) => handleChange('storeCount', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Расскажите о вашем бренде <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Опишите ваш бренд, ассортимент, целевую аудиторию и почему вы хотите стать партнёром StyleAI..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  required
                  rows={5}
                  className="resize-none"
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    После отправки заявки наш менеджер свяжется с вами для обсуждения условий сотрудничества и интеграции
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate('/')}
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-secondary"
                >
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить заявку
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-pink-50 mt-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Icon name="Phone" size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Есть вопросы?</p>
                <p className="text-xs text-muted-foreground">Свяжитесь с нами: partnership@styleai.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Partnership;
