import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

const ProfileSection = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-primary via-secondary to-accent text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-20 h-20 ring-4 ring-white/30">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna" />
              <AvatarFallback>АН</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Анна Петрова</h2>
              <p className="text-white/80 text-sm mb-2">anna@example.com</p>
              <Badge className="bg-white/20 text-white border-white/30">
                <Icon name="Crown" size={12} className="mr-1" />
                Premium
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-center">
              <div className="text-2xl font-bold">156</div>
              <div className="text-xs text-white/80">Образов</div>
            </div>
            <div className="text-center border-x border-white/20">
              <div className="text-2xl font-bold">42</div>
              <div className="text-xs text-white/80">Избранных</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-white/80">Событий</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Settings" size={20} />
            Настройки
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="User" size={18} className="mr-3" />
            Редактировать профиль
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="Bell" size={18} className="mr-3" />
            Уведомления
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="CreditCard" size={18} className="mr-3" />
            Подписка и оплата
          </Button>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Handshake" size={20} />
            Партнёрство
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Хочешь стать нашим партнёром? Предлагаем выгодные условия для магазинов одежды и брендов.
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Доступ к 50,000+ активных пользователей</span>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">AI-рекомендации ваших товаров</span>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Интеграция с вашей системой доставки</span>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Аналитика продаж в реальном времени</span>
            </div>
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-primary to-secondary"
            onClick={() => navigate('/partnership')}
          >
            <Icon name="Mail" size={18} className="mr-2" />
            Стать партнёром
          </Button>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="MessageCircle" size={20} />
            Контакты
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Mail" size={18} className="mr-3" />
            support@styleai.com
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Phone" size={18} className="mr-3" />
            +7 (495) 123-45-67
          </Button>
          <Separator />
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="flex-1">
              <Icon name="MessageCircle" size={20} />
            </Button>
            <Button variant="outline" size="icon" className="flex-1">
              <Icon name="Instagram" size={20} />
            </Button>
            <Button variant="outline" size="icon" className="flex-1">
              <Icon name="Facebook" size={20} />
            </Button>
            <Button variant="outline" size="icon" className="flex-1">
              <Icon name="Twitter" size={20} />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти из аккаунта
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;