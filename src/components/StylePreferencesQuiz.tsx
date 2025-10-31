import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const StylePreferencesQuiz = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    styles: [] as string[],
    occasions: [] as string[],
    favoriteColors: [] as string[],
    celebrities: '',
    fashionIcons: '',
    brands: '',
    budget: '',
    notes: ''
  });
  const USER_DATA_API = 'https://functions.poehali.dev/5ea73222-00d7-4e98-830c-7edf76bbef24';
  const userId = 1;

  useEffect(() => {
    loadUserPreferences();
  }, []);

  const loadUserPreferences = async () => {
    try {
      const response = await fetch(`${USER_DATA_API}?user_id=${userId}&type=preferences`);
      const data = await response.json();
      
      if (data.preferences) {
        setPreferences({
          styles: data.preferences.favorite_styles || [],
          occasions: data.preferences.favorite_occasions || [],
          favoriteColors: data.preferences.favorite_colors || [],
          celebrities: data.preferences.favorite_celebrities || '',
          fashionIcons: data.preferences.fashion_icons || '',
          brands: data.preferences.favorite_brands || '',
          budget: data.preferences.budget_max ? `${data.preferences.budget_min}-${data.preferences.budget_max}` : '',
          notes: data.preferences.additional_notes || ''
        });
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  };

  const styleOptions = [
    { id: 'casual', label: 'Casual', icon: 'Shirt' },
    { id: 'business', label: 'Business', icon: 'Briefcase' },
    { id: 'sport', label: 'Sport', icon: 'Dumbbell' },
    { id: 'evening', label: 'Evening', icon: 'Sparkles' },
    { id: 'street', label: 'Street', icon: 'Flame' },
    { id: 'romantic', label: 'Romantic', icon: 'Heart' },
    { id: 'bohemian', label: 'Bohemian', icon: 'Flower' },
    { id: 'minimalist', label: 'Minimalist', icon: 'Circle' }
  ];

  const occasionOptions = [
    'Работа/Офис',
    'Свидания',
    'Вечеринки',
    'Спорт/Фитнес',
    'Путешествия',
    'Торжества',
    'Повседневная жизнь',
    'Встречи с друзьями'
  ];

  const colorOptions = [
    { name: 'Черный', hex: '#000000' },
    { name: 'Белый', hex: '#FFFFFF' },
    { name: 'Бежевый', hex: '#D4C4B0' },
    { name: 'Синий', hex: '#2563EB' },
    { name: 'Красный', hex: '#DC2626' },
    { name: 'Розовый', hex: '#EC4899' },
    { name: 'Зеленый', hex: '#16A34A' },
    { name: 'Желтый', hex: '#EAB308' },
    { name: 'Фиолетовый', hex: '#9333EA' },
    { name: 'Коричневый', hex: '#92400E' }
  ];

  const toggleStyle = (styleId: string) => {
    setPreferences(prev => ({
      ...prev,
      styles: prev.styles.includes(styleId)
        ? prev.styles.filter(s => s !== styleId)
        : [...prev.styles, styleId]
    }));
  };

  const toggleOccasion = (occasion: string) => {
    setPreferences(prev => ({
      ...prev,
      occasions: prev.occasions.includes(occasion)
        ? prev.occasions.filter(o => o !== occasion)
        : [...prev.occasions, occasion]
    }));
  };

  const toggleColor = (color: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteColors: prev.favoriteColors.includes(color)
        ? prev.favoriteColors.filter(c => c !== color)
        : [...prev.favoriteColors, color]
    }));
  };

  const handleComplete = async () => {
    setIsSaving(true);
    try {
      await fetch(USER_DATA_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_preferences',
          user_id: userId,
          favorite_styles: preferences.styles,
          favorite_occasions: preferences.occasions,
          favorite_colors: preferences.favoriteColors,
          favorite_celebrities: preferences.celebrities,
          fashion_icons: preferences.fashionIcons,
          favorite_brands: preferences.brands,
          budget_min: 5000,
          budget_max: 200000,
          additional_notes: preferences.notes
        })
      });
      
      toast({
        title: 'Анкета сохранена!',
        description: 'AI теперь будет подбирать образы на основе ваших предпочтений',
      });
      
      setStep(1);
    } catch (error) {
      console.error('Failed to save preferences:', error);
      toast({
        title: 'Ошибка сохранения',
        description: 'Не удалось сохранить данные',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <Icon name="ClipboardList" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Анкета предпочтений</h3>
              <p className="text-sm text-muted-foreground">
                Заполните анкету, чтобы AI точнее подбирал образы под ваш вкус
              </p>
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full ${
                      s <= step ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {step === 1 && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Palette" size={20} />
              Шаг 1: Любимые стили
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Выберите стили, которые вам нравятся (можно несколько)
            </p>
            <div className="grid grid-cols-2 gap-3">
              {styleOptions.map((style) => (
                <button
                  key={style.id}
                  onClick={() => toggleStyle(style.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    preferences.styles.includes(style.id)
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <Icon name={style.icon as any} size={24} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">{style.label}</p>
                </button>
              ))}
            </div>
            <Button
              className="w-full bg-gradient-to-r from-primary to-secondary"
              onClick={() => setStep(2)}
              disabled={preferences.styles.length === 0}
            >
              Далее
              <Icon name="ChevronRight" size={18} className="ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="CalendarDays" size={20} />
              Шаг 2: Для каких случаев?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Выберите случаи, для которых подбираете образы
            </p>
            <div className="space-y-2">
              {occasionOptions.map((occasion) => (
                <div
                  key={occasion}
                  className="flex items-center space-x-3 p-3 rounded-lg border-2 border-gray-100 hover:border-primary/50 transition-all cursor-pointer"
                  onClick={() => toggleOccasion(occasion)}
                >
                  <Checkbox
                    checked={preferences.occasions.includes(occasion)}
                    onCheckedChange={() => toggleOccasion(occasion)}
                  />
                  <label className="text-sm font-medium flex-1 cursor-pointer">
                    {occasion}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                <Icon name="ChevronLeft" size={18} className="mr-2" />
                Назад
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-secondary"
                onClick={() => setStep(3)}
                disabled={preferences.occasions.length === 0}
              >
                Далее
                <Icon name="ChevronRight" size={18} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Paintbrush" size={20} />
              Шаг 3: Любимые цвета
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Выберите цвета, которые вам нравятся в одежде
            </p>
            <div className="grid grid-cols-3 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.name}
                  onClick={() => toggleColor(color.name)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    preferences.favoriteColors.includes(color.name)
                      ? 'border-primary ring-2 ring-primary/50'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-gray-200"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="text-xs font-medium">{color.name}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                <Icon name="ChevronLeft" size={18} className="mr-2" />
                Назад
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-secondary"
                onClick={() => setStep(4)}
                disabled={preferences.favoriteColors.length === 0}
              >
                Далее
                <Icon name="ChevronRight" size={18} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Star" size={20} />
              Шаг 4: Стилевые вдохновения
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Любимые актеры/знаменитости (через запятую)
              </label>
              <Input
                placeholder="Например: Моника Беллуччи, Райан Гослинг"
                value={preferences.celebrities}
                onChange={(e) => setPreferences({ ...preferences, celebrities: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                AI будет искать похожие образы
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Fashion-иконы или блогеры
              </label>
              <Input
                placeholder="Например: Chiara Ferragni, Ольга Бузова"
                value={preferences.fashionIcons}
                onChange={(e) => setPreferences({ ...preferences, fashionIcons: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Любимые бренды
              </label>
              <Input
                placeholder="Например: ZARA, Mango, COS"
                value={preferences.brands}
                onChange={(e) => setPreferences({ ...preferences, brands: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Дополнительные пожелания
              </label>
              <Textarea
                placeholder="Расскажите о своих предпочтениях: что нравится, что не нравится..."
                rows={4}
                value={preferences.notes}
                onChange={(e) => setPreferences({ ...preferences, notes: e.target.value })}
              />
            </div>

            <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
              <h4 className="text-sm font-bold mb-2">Ваш профиль предпочтений:</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Стили:</span>{' '}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {preferences.styles.map(s => (
                      <Badge key={s} variant="secondary" className="text-xs">
                        {styleOptions.find(opt => opt.id === s)?.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Случаи:</span>{' '}
                  {preferences.occasions.join(', ')}
                </div>
                <div>
                  <span className="text-muted-foreground">Цвета:</span>{' '}
                  {preferences.favoriteColors.join(', ')}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                <Icon name="ChevronLeft" size={18} className="mr-2" />
                Назад
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-secondary"
                onClick={handleComplete}
                disabled={isSaving}
              >
                <Icon name={isSaving ? "Loader2" : "Check"} size={18} className={`mr-2 ${isSaving ? 'animate-spin' : ''}`} />
                {isSaving ? 'Сохранение...' : 'Завершить'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StylePreferencesQuiz;