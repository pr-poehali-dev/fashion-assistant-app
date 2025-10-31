import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface RecognizedItem {
  id: number;
  name: string;
  category: string;
  confidence: number;
  boundingBox: { x: number; y: number; width: number; height: number };
  similarProducts: SimilarProduct[];
}

interface SimilarProduct {
  id: number;
  name: string;
  brand: string;
  price: string;
  imageUrl: string;
  storeUrl: string;
  similarity: number;
  inStock: boolean;
  sizes: string[];
}

interface ImageRecognitionProps {
  imageUrl: string;
  onBack?: () => void;
}

const ImageRecognition = ({ imageUrl, onBack }: ImageRecognitionProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const recognizedItems: RecognizedItem[] = [
    {
      id: 1,
      name: 'Белая блузка',
      category: 'Верх',
      confidence: 95,
      boundingBox: { x: 30, y: 20, width: 40, height: 30 },
      similarProducts: [
        {
          id: 1,
          name: 'Белая рубашка oversize',
          brand: 'ZARA',
          price: '2 999 ₽',
          imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/8d0c4af5-d4b9-41e1-a04f-3ec85422380a.jpg',
          storeUrl: 'https://zara.com',
          similarity: 98,
          inStock: true,
          sizes: ['XS', 'S', 'M', 'L']
        },
        {
          id: 2,
          name: 'Классическая белая блузка',
          brand: 'Mango',
          price: '3 499 ₽',
          imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/695e0ddb-c62f-4248-89d6-86349a7afb0f.jpg',
          storeUrl: 'https://mango.com',
          similarity: 95,
          inStock: true,
          sizes: ['S', 'M', 'L', 'XL']
        },
        {
          id: 3,
          name: 'Рубашка из хлопка',
          brand: 'H&M',
          price: '1 999 ₽',
          imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/ba01e802-dc68-4510-8bbb-293f6c35d7d9.jpg',
          storeUrl: 'https://hm.com',
          similarity: 92,
          inStock: false,
          sizes: ['XS', 'S', 'M']
        }
      ]
    },
    {
      id: 2,
      name: 'Черные брюки',
      category: 'Низ',
      confidence: 92,
      boundingBox: { x: 25, y: 50, width: 50, height: 45 },
      similarProducts: [
        {
          id: 4,
          name: 'Прямые брюки со стрелками',
          brand: 'ZARA',
          price: '3 999 ₽',
          imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/8d0c4af5-d4b9-41e1-a04f-3ec85422380a.jpg',
          storeUrl: 'https://zara.com',
          similarity: 96,
          inStock: true,
          sizes: ['36', '38', '40', '42', '44']
        },
        {
          id: 5,
          name: 'Классические брюки',
          brand: 'Massimo Dutti',
          price: '6 990 ₽',
          imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/695e0ddb-c62f-4248-89d6-86349a7afb0f.jpg',
          storeUrl: 'https://massimodutti.com',
          similarity: 94,
          inStock: true,
          sizes: ['38', '40', '42', '44']
        }
      ]
    },
    {
      id: 3,
      name: 'Туфли-лодочки',
      category: 'Обувь',
      confidence: 89,
      boundingBox: { x: 35, y: 85, width: 30, height: 10 },
      similarProducts: [
        {
          id: 6,
          name: 'Классические туфли на каблуке',
          brand: 'ZARA',
          price: '4 999 ₽',
          imageUrl: 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/ba01e802-dc68-4510-8bbb-293f6c35d7d9.jpg',
          storeUrl: 'https://zara.com',
          similarity: 91,
          inStock: true,
          sizes: ['36', '37', '38', '39', '40']
        }
      ]
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Верх': return 'Shirt';
      case 'Низ': return 'PanelsTopLeft';
      case 'Обувь': return 'Footprints';
      case 'Аксессуары': return 'Watch';
      default: return 'Sparkles';
    }
  };

  const selectedItemData = recognizedItems.find(item => item.id === selectedItem);

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon name="ScanSearch" size={20} />
              Распознавание образа
            </CardTitle>
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <img 
              src={imageUrl} 
              alt="Analyzing look"
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 pointer-events-none">
              {recognizedItems.map((item) => (
                <div
                  key={item.id}
                  className={`absolute border-2 rounded transition-all cursor-pointer pointer-events-auto ${
                    selectedItem === item.id 
                      ? 'border-primary bg-primary/20' 
                      : 'border-green-500 bg-green-500/10 hover:border-primary hover:bg-primary/20'
                  }`}
                  style={{
                    left: `${item.boundingBox.x}%`,
                    top: `${item.boundingBox.y}%`,
                    width: `${item.boundingBox.width}%`,
                    height: `${item.boundingBox.height}%`,
                  }}
                  onClick={() => setSelectedItem(item.id)}
                >
                  <Badge 
                    className={`absolute -top-3 left-0 ${
                      selectedItem === item.id ? 'bg-primary' : 'bg-green-500'
                    }`}
                  >
                    {item.name}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Icon name="Info" size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">
                    Найдено {recognizedItems.length} элементов одежды
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Кликни на элемент на фото, чтобы увидеть похожие товары в магазинах
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Layers" size={20} />
            Распознанные элементы
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recognizedItems.map((item) => (
            <Card 
              key={item.id}
              className={`border-2 cursor-pointer transition-all ${
                selectedItem === item.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
              }`}
              onClick={() => setSelectedItem(item.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Icon name={getCategoryIcon(item.category) as any} size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Progress value={item.confidence} className="w-20 h-2" />
                      <span className="text-xs font-semibold">{item.confidence}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.similarProducts.length} похожих
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {selectedItemData && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="ShoppingBag" size={20} />
              Похожие товары: {selectedItemData.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Icon name="TrendingUp" size={12} />
                Сортировка по похожести
              </Badge>
              <p className="text-xs text-muted-foreground">
                {selectedItemData.similarProducts.filter(p => p.inStock).length} в наличии
              </p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-3">
              {selectedItemData.similarProducts.map((product) => (
                <Card key={product.id} className="border-2 hover:shadow-md transition-all">
                  <CardContent className="p-3">
                    <div className="flex gap-3">
                      <img 
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium mb-1">{product.name}</p>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {product.brand}
                              </Badge>
                              {product.inStock ? (
                                <Badge className="bg-green-500 text-xs">
                                  <Icon name="Check" size={10} className="mr-1" />
                                  В наличии
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs">
                                  Нет в наличии
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold">{product.price}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Progress value={product.similarity} className="w-12 h-1" />
                              <span className="text-xs text-green-600 font-semibold">
                                {product.similarity}%
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-xs text-muted-foreground">Размеры:</p>
                          <div className="flex gap-1">
                            {product.sizes.map((size, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {size}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1 h-7 text-xs"
                            onClick={() => window.open(product.storeUrl, '_blank')}
                            disabled={!product.inStock}
                          >
                            <Icon name="ExternalLink" size={12} className="mr-1" />
                            Купить в {product.brand}
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            <Icon name="Heart" size={12} className="mr-1" />
                            Сохранить
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Icon name="Sparkles" size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">AI подсказка</p>
                    <p className="text-xs text-muted-foreground">
                      Товары подобраны с учётом твоих размеров и предпочтений из профиля. 
                      Процент показывает степень похожести на оригинал.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageRecognition;
