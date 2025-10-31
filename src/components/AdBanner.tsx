import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';

interface AdBannerProps {
  isTrialUser?: boolean;
}

const AdBanner = ({ isTrialUser = true }: AdBannerProps) => {
  const [currentAd, setCurrentAd] = useState(0);
  const [ads] = useState([
    {
      id: 1,
      advertiser: 'ZARA',
      title: 'Новая коллекция весна-лето 2025',
      description: 'Скидка 30% на все платья',
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg',
      link: 'https://zara.com',
      cta: 'Смотреть коллекцию',
      partner: true
    },
    {
      id: 2,
      advertiser: 'Beauty Point',
      title: 'Профессиональный макияж от 2500₽',
      description: 'Запись на сегодня со скидкой 20%',
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg',
      link: 'https://beautypoint.ru',
      cta: 'Записаться',
      partner: true
    },
    {
      id: 3,
      advertiser: 'Lamoda',
      title: 'Обувь premium брендов',
      description: 'Бесплатная доставка от 2500₽',
      image: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg',
      link: 'https://lamoda.ru',
      cta: 'В каталог',
      partner: true
    }
  ]);

  useEffect(() => {
    if (!isTrialUser) return;

    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isTrialUser, ads.length]);

  const handleAdClick = async (ad: typeof ads[0]) => {
    try {
      await fetch('https://functions.poehali.dev/d06387db-58fb-47ab-95f9-a5a6a5516c4a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'track_ad_click',
          ad_id: ad.id,
          advertiser: ad.advertiser,
          click_cost: 10
        })
      });
    } catch (error) {
      console.error('Failed to track ad click:', error);
    }

    window.open(ad.link, '_blank');
  };

  if (!isTrialUser) return null;

  const ad = ads[currentAd];

  return (
    <Card className="border-0 shadow-md overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">
      <CardContent className="p-0">
        <div className="relative">
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur text-xs"
          >
            <Icon name="Sparkles" size={12} className="mr-1" />
            Реклама партнёра
          </Badge>
          
          <div className="flex gap-3 p-4">
            <img 
              src={ad.image} 
              alt={ad.advertiser}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-bold text-sm line-clamp-1">{ad.advertiser}</h4>
                {ad.partner && (
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    Партнёр
                  </Badge>
                )}
              </div>
              <p className="text-sm font-medium mb-1 line-clamp-1">{ad.title}</p>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                {ad.description}
              </p>
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                onClick={() => handleAdClick(ad)}
              >
                {ad.cta}
                <Icon name="ExternalLink" size={14} className="ml-2" />
              </Button>
            </div>
          </div>

          <div className="flex gap-1 justify-center pb-2">
            {ads.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAd(index)}
                className={`h-1 rounded-full transition-all ${
                  index === currentAd ? 'w-6 bg-primary' : 'w-1 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-4 pb-3 pt-2 border-t bg-gradient-to-r from-primary/5 to-secondary/5">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Icon name="Info" size={12} />
            Хотите убрать рекламу? Оформите Premium подписку
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdBanner;
