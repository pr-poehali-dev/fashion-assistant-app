import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const ProfilePhotoUpload = () => {
  const { toast } = useToast();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<any>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
        analyzePhoto();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePhoto = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setAiRecommendations({
        colorType: 'Теплый цветотип',
        bodyType: 'Прямоугольник',
        recommendedStyles: ['Casual chic', 'Romantic', 'Classic'],
        colors: ['Бежевый', 'Коралловый', 'Оливковый', 'Терракотовый'],
        avoid: ['Холодные синие', 'Яркий фиолетовый'],
        celebrities: ['Дженнифер Энистон', 'Жизель Бундхен']
      });
      setIsAnalyzing(false);
      toast({
        title: 'Анализ завершен!',
        description: 'AI определил ваш цветотип и подходящие стили',
      });
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-primary via-secondary to-accent text-white">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">AI-анализ внешности</h3>
              <p className="text-sm text-white/90">
                Загрузите фото, и AI определит ваш цветотип, тип фигуры и подберет идеальные стили
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="User" size={20} />
            Фото профиля
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center">
            <Avatar className="w-32 h-32 ring-4 ring-primary/20 mb-4">
              <AvatarImage src={profilePhoto || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna'} />
              <AvatarFallback>АН</AvatarFallback>
            </Avatar>
            
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="profile-photo-upload"
            />
            <label htmlFor="profile-photo-upload">
              <Button className="bg-gradient-to-r from-primary to-secondary" asChild>
                <span>
                  <Icon name="Upload" size={18} className="mr-2" />
                  Загрузить фото
                </span>
              </Button>
            </label>
          </div>

          {isAnalyzing && (
            <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="animate-spin">
                  <Icon name="Loader2" size={20} className="text-primary" />
                </div>
                <p className="text-sm font-medium">AI анализирует ваше фото...</p>
              </div>
            </div>
          )}

          {aiRecommendations && !isAnalyzing && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="CheckCircle" size={20} className="text-green-600" />
                  <h4 className="font-bold">Анализ завершен</h4>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Цветотип</p>
                    <Badge className="bg-gradient-to-r from-primary to-secondary">
                      {aiRecommendations.colorType}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Тип фигуры</p>
                    <Badge variant="secondary">{aiRecommendations.bodyType}</Badge>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Рекомендованные стили</p>
                    <div className="flex flex-wrap gap-2">
                      {aiRecommendations.recommendedStyles.map((style: string) => (
                        <Badge key={style} variant="outline" className="border-primary text-primary">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Подходящие цвета</p>
                    <div className="flex flex-wrap gap-2">
                      {aiRecommendations.colors.map((color: string) => (
                        <Badge key={color} className="bg-gradient-to-r from-green-500 to-emerald-500">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Избегайте</p>
                    <div className="flex flex-wrap gap-2">
                      {aiRecommendations.avoid.map((color: string) => (
                        <Badge key={color} variant="destructive" className="opacity-70">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Похожий стиль у знаменитостей</p>
                    <div className="flex flex-wrap gap-2">
                      {aiRecommendations.celebrities.map((celeb: string) => (
                        <Badge key={celeb} variant="secondary" className="flex items-center gap-1">
                          <Icon name="Star" size={12} />
                          {celeb}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Icon name="Download" size={18} className="mr-2" />
                Сохранить рекомендации
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePhotoUpload;
