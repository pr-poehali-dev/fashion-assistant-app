import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import PhotoUpload from '@/components/PhotoUpload';
import LookAnalysis from '@/components/LookAnalysis';
import StyleSelector from '@/components/StyleSelector';
import AnalysisHistory from '@/components/AnalysisHistory';
import ImprovementSuggestions from '@/components/ImprovementSuggestions';
import EventCalendar from '@/components/EventCalendar';
import StoreList from '@/components/StoreList';
import ProfileSection from '@/components/ProfileSection';
import UserPreferences from '@/components/UserPreferences';
import FavoriteLooks from '@/components/FavoriteLooks';
import ImageRecognition from '@/components/ImageRecognition';
import CapsuleWardrobe from '@/components/CapsuleWardrobe';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [searchImage, setSearchImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                StyleAI
              </h1>
              <p className="text-sm text-muted-foreground">Твой персональный стилист</p>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              <Icon name="Sparkles" size={14} className="mr-1" />
              Premium
            </Badge>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur">
            <TabsTrigger value="home" className="flex flex-col gap-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Home" size={20} />
              <span className="text-xs">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="analyze" className="flex flex-col gap-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Camera" size={20} />
              <span className="text-xs">Анализ</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex flex-col gap-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="ScanSearch" size={20} />
              <span className="text-xs">Поиск</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex flex-col gap-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Heart" size={20} />
              <span className="text-xs">Избранное</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex flex-col gap-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Calendar" size={20} />
              <span className="text-xs">События</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col gap-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="User" size={20} />
              <span className="text-xs">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-4">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-primary via-secondary to-accent text-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Создай свой идеальный образ, стань Super super star</h2>
                    <p className="text-white/90 text-sm">AI поможет подобрать стиль под любой случай и быть эталоном стиля, находясь в центре внимания</p>
                  </div>
                  <Icon name="Sparkles" size={48} className="opacity-50" />
                </div>
                <img 
                  src="https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/cc78f2fe-fb97-46c3-b7c9-36240a7ef714.jpg"
                  alt="Fashion hero"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-0 shadow-md hover:shadow-xl transition-all cursor-pointer" onClick={() => setActiveTab('analyze')}>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-2">
                    <Icon name="ScanFace" size={24} className="text-white" />
                  </div>
                  <CardTitle className="text-lg">AI-Анализ</CardTitle>
                  <CardDescription>Оцени свой образ</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-xl transition-all cursor-pointer" onClick={() => setActiveTab('search')}>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-2">
                    <Icon name="ScanSearch" size={24} className="text-white" />
                  </div>
                  <CardTitle className="text-lg">Поиск вещей</CardTitle>
                  <CardDescription>Найди по фото</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-xl transition-all cursor-pointer" onClick={() => setActiveTab('calendar')}>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-2">
                    <Icon name="CalendarDays" size={24} className="text-white" />
                  </div>
                  <CardTitle className="text-lg">Календарь</CardTitle>
                  <CardDescription>События и образы</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-xl transition-all cursor-pointer" onClick={() => setActiveTab('capsule')}>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mb-2">
                    <Icon name="Package" size={24} className="text-white" />
                  </div>
                  <CardTitle className="text-lg">Капсулы</CardTitle>
                  <CardDescription>Гардеробы</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} />
                  Тренды сезона
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {['Минимализм', 'Бохо', 'Спорт-шик', 'Классика', 'Streetwear'].map((style) => (
                    <Badge key={style} variant="outline" className="whitespace-nowrap cursor-pointer hover:bg-primary hover:text-white transition-colors">
                      {style}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analyze" className="space-y-4">
            <PhotoUpload onImageUpload={setUploadedImage} />
            {uploadedImage && <LookAnalysis imageUrl={uploadedImage} />}
            <StyleSelector />
            <ImprovementSuggestions />
            <AnalysisHistory onSelectAnalysis={setUploadedImage} />
          </TabsContent>

          <TabsContent value="search" className="space-y-4">
            {!searchImage ? (
              <PhotoUpload onImageUpload={setSearchImage} mode="search" />
            ) : (
              <ImageRecognition imageUrl={searchImage} onBack={() => setSearchImage(null)} />
            )}
          </TabsContent>

          <TabsContent value="favorites">
            <FavoriteLooks onSelectLook={setUploadedImage} />
          </TabsContent>

          <TabsContent value="capsule">
            <CapsuleWardrobe />
          </TabsContent>

          <TabsContent value="calendar">
            <EventCalendar />
          </TabsContent>

          <TabsContent value="stores">
            <StoreList />
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <ProfileSection />
            <UserPreferences />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;