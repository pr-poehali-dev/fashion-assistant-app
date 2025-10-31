import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<any>(null);
  const [banners, setBanners] = useState<any[]>([]);
  const [salons, setSalons] = useState<any[]>([]);
  const [settings, setSettings] = useState<any[]>([]);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [editingSalon, setEditingSalon] = useState<any>(null);

  const ADMIN_API = 'https://functions.poehali.dev/a94f54cb-81d8-407c-8d0a-b7d6125c61a7';

  useEffect(() => {
    loadStats();
    loadBanners();
    loadSalons();
    loadSettings();
  }, []);

  const loadStats = async () => {
    try {
      const response = await fetch(`${ADMIN_API}?resource=stats`);
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const loadBanners = async () => {
    try {
      const response = await fetch(`${ADMIN_API}?resource=banners`);
      const data = await response.json();
      setBanners(data.banners || []);
    } catch (error) {
      console.error('Failed to load banners:', error);
    }
  };

  const loadSalons = async () => {
    try {
      const response = await fetch(`${ADMIN_API}?resource=salons`);
      const data = await response.json();
      setSalons(data.salons || []);
    } catch (error) {
      console.error('Failed to load salons:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const response = await fetch(`${ADMIN_API}?resource=settings`);
      const data = await response.json();
      setSettings(data.settings || []);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const saveBanner = async () => {
    try {
      const method = editingBanner.id ? 'PUT' : 'POST';
      await fetch(ADMIN_API, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resource: 'banner',
          ...editingBanner
        })
      });

      toast({ title: 'Баннер сохранён!' });
      setEditingBanner(null);
      loadBanners();
    } catch (error) {
      toast({ title: 'Ошибка сохранения', variant: 'destructive' });
    }
  };

  const saveSalon = async () => {
    try {
      const method = editingSalon.id ? 'PUT' : 'POST';
      await fetch(ADMIN_API, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resource: 'salon',
          ...editingSalon
        })
      });

      toast({ title: 'Салон сохранён!' });
      setEditingSalon(null);
      loadSalons();
    } catch (error) {
      toast({ title: 'Ошибка сохранения', variant: 'destructive' });
    }
  };

  const saveSetting = async (key: string, value: string) => {
    try {
      await fetch(ADMIN_API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resource: 'setting',
          key,
          value
        })
      });

      toast({ title: 'Настройка сохранена!' });
      loadSettings();
    } catch (error) {
      toast({ title: 'Ошибка сохранения', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
            Админ-панель StyleAI
          </h1>
          <p className="text-sm text-muted-foreground">Управление платформой и настройками</p>
        </header>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Icon name="MousePointerClick" size={16} />
                  Клики по рекламе
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total_ad_clicks || 0}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Доход: {parseFloat(stats.total_ad_revenue || 0).toFixed(2)} ₽
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Icon name="CalendarCheck" size={16} />
                  Записи в салоны
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total_bookings || 0}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Завершено: {stats.completed_bookings || 0}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Icon name="Users" size={16} />
                  Пользователи
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.users_with_profile || 0}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  С анкетой: {stats.users_with_preferences || 0}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="banners" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="banners">
              <Icon name="MonitorPlay" size={16} className="mr-2" />
              Баннеры
            </TabsTrigger>
            <TabsTrigger value="salons">
              <Icon name="Store" size={16} className="mr-2" />
              Салоны
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="banners" className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Рекламные баннеры</CardTitle>
                  <Button onClick={() => setEditingBanner({})}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить баннер
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {banners.map((banner) => (
                  <Card key={banner.id} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold">{banner.advertiser}</h4>
                            {banner.is_partner && (
                              <Badge variant="secondary">Партнёр</Badge>
                            )}
                            {banner.is_active ? (
                              <Badge className="bg-green-500">Активен</Badge>
                            ) : (
                              <Badge variant="outline">Неактивен</Badge>
                            )}
                          </div>
                          <p className="text-sm mb-1">{banner.title}</p>
                          <p className="text-xs text-muted-foreground mb-2">{banner.description}</p>
                          <div className="flex gap-4 text-xs">
                            <span>Приоритет: {banner.priority}</span>
                            <span>Клик: {banner.click_cost}₽</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingBanner(banner)}
                        >
                          <Icon name="Edit" size={14} className="mr-1" />
                          Изменить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {editingBanner && (
              <Card className="border-0 shadow-lg border-primary">
                <CardHeader>
                  <CardTitle>
                    {editingBanner.id ? 'Редактировать баннер' : 'Новый баннер'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Рекламодатель</label>
                      <Input
                        value={editingBanner.advertiser || ''}
                        onChange={(e) => setEditingBanner({ ...editingBanner, advertiser: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Стоимость клика (₽)</label>
                      <Input
                        type="number"
                        value={editingBanner.click_cost || 10}
                        onChange={(e) => setEditingBanner({ ...editingBanner, click_cost: parseFloat(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Заголовок</label>
                    <Input
                      value={editingBanner.title || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Описание</label>
                    <Textarea
                      value={editingBanner.description || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">URL изображения</label>
                      <Input
                        value={editingBanner.image_url || ''}
                        onChange={(e) => setEditingBanner({ ...editingBanner, image_url: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Ссылка</label>
                      <Input
                        value={editingBanner.link_url || ''}
                        onChange={(e) => setEditingBanner({ ...editingBanner, link_url: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Текст кнопки</label>
                      <Input
                        value={editingBanner.cta_text || 'Перейти'}
                        onChange={(e) => setEditingBanner({ ...editingBanner, cta_text: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Приоритет</label>
                      <Input
                        type="number"
                        value={editingBanner.priority || 0}
                        onChange={(e) => setEditingBanner({ ...editingBanner, priority: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={editingBanner.is_active !== false}
                          onCheckedChange={(checked) => setEditingBanner({ ...editingBanner, is_active: checked })}
                        />
                        <label className="text-sm">Активен</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={editingBanner.is_partner === true}
                          onCheckedChange={(checked) => setEditingBanner({ ...editingBanner, is_partner: checked })}
                        />
                        <label className="text-sm">Партнёр</label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={saveBanner} className="flex-1">
                      <Icon name="Save" size={16} className="mr-2" />
                      Сохранить
                    </Button>
                    <Button variant="outline" onClick={() => setEditingBanner(null)}>
                      Отмена
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="salons" className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Салоны красоты</CardTitle>
                  <Button onClick={() => setEditingSalon({})}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить салон
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {salons.map((salon) => (
                  <Card key={salon.id} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold">{salon.name}</h4>
                            {salon.is_partner && (
                              <Badge className="bg-gradient-to-r from-primary to-secondary">Партнёр</Badge>
                            )}
                            <Badge variant="outline">
                              <Icon name="Star" size={12} className="mr-1" />
                              {salon.rating}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{salon.address}</p>
                          <div className="flex gap-4 text-xs">
                            <span>Услуг: {salon.services_count}</span>
                            <span>Записей: {salon.bookings_count}</span>
                            <span>Отзывов: {salon.reviews_count}</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSalon(salon)}
                        >
                          <Icon name="Edit" size={14} className="mr-1" />
                          Изменить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {editingSalon && (
              <Card className="border-0 shadow-lg border-primary">
                <CardHeader>
                  <CardTitle>
                    {editingSalon.id ? 'Редактировать салон' : 'Новый салон'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Название салона</label>
                    <Input
                      value={editingSalon.name || ''}
                      onChange={(e) => setEditingSalon({ ...editingSalon, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Адрес</label>
                    <Input
                      value={editingSalon.address || ''}
                      onChange={(e) => setEditingSalon({ ...editingSalon, address: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Рейтинг</label>
                      <Input
                        type="number"
                        step="0.1"
                        max="5"
                        value={editingSalon.rating || 0}
                        onChange={(e) => setEditingSalon({ ...editingSalon, rating: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Отзывов</label>
                      <Input
                        type="number"
                        value={editingSalon.reviews_count || 0}
                        onChange={(e) => setEditingSalon({ ...editingSalon, reviews_count: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={editingSalon.is_partner === true}
                          onCheckedChange={(checked) => setEditingSalon({ ...editingSalon, is_partner: checked })}
                        />
                        <label className="text-sm">Партнёр</label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">URL изображения</label>
                    <Input
                      value={editingSalon.image_url || ''}
                      onChange={(e) => setEditingSalon({ ...editingSalon, image_url: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={saveSalon} className="flex-1">
                      <Icon name="Save" size={16} className="mr-2" />
                      Сохранить
                    </Button>
                    <Button variant="outline" onClick={() => setEditingSalon(null)}>
                      Отмена
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            {['contacts', 'general', 'subscription', 'advertising', 'partner', 'social'].map((category) => {
              const categorySettings = settings.filter(s => s.category === category);
              if (categorySettings.length === 0) return null;

              const categoryNames: Record<string, string> = {
                contacts: 'Контакты',
                general: 'Общие',
                subscription: 'Подписка',
                advertising: 'Реклама',
                partner: 'Партнёрство',
                social: 'Соцсети'
              };

              return (
                <Card key={category} className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>{categoryNames[category]}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {categorySettings.map((setting) => (
                      <div key={setting.id}>
                        <label className="text-sm font-medium mb-2 block">
                          {setting.description}
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type={setting.setting_type === 'number' ? 'number' : 'text'}
                            defaultValue={setting.setting_value}
                            id={`setting-${setting.id}`}
                          />
                          <Button
                            variant="outline"
                            onClick={() => {
                              const input = document.getElementById(`setting-${setting.id}`) as HTMLInputElement;
                              saveSetting(setting.setting_key, input.value);
                            }}
                          >
                            <Icon name="Save" size={16} />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Ключ: {setting.setting_key}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
