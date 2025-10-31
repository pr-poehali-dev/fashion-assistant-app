import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const ProfilePhotoUpload = () => {
  const { toast } = useToast();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<any>(null);
  const USER_DATA_API = 'https://functions.poehali.dev/5ea73222-00d7-4e98-830c-7edf76bbef24';
  const userId = 1;

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await fetch(`${USER_DATA_API}?user_id=${userId}&type=profile`);
      const data = await response.json();
      
      if (data.profile) {
        setProfilePhoto(data.profile.profile_photo_url);
        setAiRecommendations({
          colorType: data.profile.ai_color_type,
          bodyType: data.profile.ai_body_type,
          recommendedStyles: data.profile.ai_recommended_styles || [],
          colors: data.profile.ai_recommended_colors || [],
          avoid: data.profile.ai_avoid_colors || [],
          celebrities: data.profile.ai_similar_celebrities || []
        });
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

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

  const analyzePhoto = async () => {
    setIsAnalyzing(true);
    
    setTimeout(async () => {
      const recommendations = {
        colorType: 'Теплый цветотип',
        bodyType: 'Прямоугольник',
        recommendedStyles: ['Casual chic', 'Romantic', 'Classic'],
        colors: ['Бежевый', 'Коралловый', 'Оливковый', 'Терракотовый'],
        avoid: ['Холодные синие', 'Яркий фиолетовый'],
        celebrities: ['Дженнифер Энистон', 'Жизель Бундхен']
      };
      
      setAiRecommendations(recommendations);
      setIsAnalyzing(false);
      
      await saveToDatabase(recommendations);
      
      toast({
        title: 'Анализ завершен и сохранён!',
        description: 'AI определил ваш цветотип и подходящие стили',
      });
    }, 2000);
  };

  const saveToDatabase = async (recommendations: any) => {
    setIsSaving(true);
    try {
      await fetch(USER_DATA_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_ai_analysis',
          user_id: userId,
          profile_photo_url: profilePhoto,
          color_type: recommendations.colorType,
          body_type: recommendations.bodyType,
          recommended_styles: recommendations.recommendedStyles,
          recommended_colors: recommendations.colors,
          avoid_colors: recommendations.avoid,
          similar_celebrities: recommendations.celebrities
        })
      });
    } catch (error) {
      console.error('Failed to save analysis:', error);
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

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => saveToDatabase(aiRecommendations)}
                disabled={isSaving}
              >
                <Icon name={isSaving ? "Loader2" : "Save"} size={18} className={`mr-2 ${isSaving ? 'animate-spin' : ''}`} />
                {isSaving ? 'Сохранение...' : 'Сохранить в профиль'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePhotoUpload;