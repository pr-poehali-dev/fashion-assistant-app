import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UserPreferences = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [preferences, setPreferences] = useState({
    clothing: {
      tops: 'M',
      bottoms: '46',
      dress: 'M',
      shoes: '38',
    },
    measurements: {
      height: '170',
      weight: '65',
      bust: '90',
      waist: '70',
      hips: '95',
    },
    brands: ['ZARA', 'H&M', 'Mango'],
    priceRange: {
      min: '1000',
      max: '10000',
    },
    colors: ['Черный', 'Белый', 'Бежевый', 'Синий'],
    styles: ['Business', 'Casual', 'Evening'],
    deliveryCity: 'Москва',
  });

  const availableBrands = [
    { name: 'ZARA', logo: '🇪🇸' },
    { name: 'H&M', logo: '🇸🇪' },
    { name: 'Mango', logo: '🇪🇸' },
    { name: 'Reserved', logo: '🇵🇱' },
    { name: 'Massimo Dutti', logo: '🇪🇸' },
    { name: 'COS', logo: '🇸🇪' },
    { name: 'Uniqlo', logo: '🇯🇵' },
    { name: 'Lamoda', logo: '🇷🇺' },
  ];

  const toggleBrand = (brand: string) => {
    setPreferences(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const toggleColor = (color: string) => {
    setPreferences(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const toggleStyle = (style: string) => {
    setPreferences(prev => ({
      ...prev,
      styles: prev.styles.includes(style)
        ? prev.styles.filter(s => s !== style)
        : [...prev.styles, style]
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saved preferences:', preferences);
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon name="Settings" size={20} />
            Параметры и предпочтения
          </CardTitle>
          <Button 
            variant={isEditing ? 'default' : 'outline'} 
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            <Icon name={isEditing ? 'Check' : 'Pencil'} size={16} className="mr-2" />
            {isEditing ? 'Сохранить' : 'Редактировать'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sizes" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sizes">Размеры</TabsTrigger>
            <TabsTrigger value="measurements">Параметры</TabsTrigger>
            <TabsTrigger value="brands">Магазины</TabsTrigger>
            <TabsTrigger value="preferences">Стиль</TabsTrigger>
          </TabsList>

          <TabsContent value="sizes" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Shirt" size={14} />
                  Верх (футболки, блузки)
                </Label>
                {isEditing ? (
                  <Select 
                    value={preferences.clothing.tops}
                    onValueChange={(value) => setPreferences(prev => ({
                      ...prev,
                      clothing: { ...prev.clothing, tops: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="XS">XS</SelectItem>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-2 bg-muted rounded-md">
                    <Badge>{preferences.clothing.tops}</Badge>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="PanelsTopLeft" size={14} />
                  Низ (брюки, юбки)
                </Label>
                {isEditing ? (
                  <Select 
                    value={preferences.clothing.bottoms}
                    onValueChange={(value) => setPreferences(prev => ({
                      ...prev,
                      clothing: { ...prev.clothing, bottoms: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="42">42</SelectItem>
                      <SelectItem value="44">44</SelectItem>
                      <SelectItem value="46">46</SelectItem>
                      <SelectItem value="48">48</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-2 bg-muted rounded-md">
                    <Badge>{preferences.clothing.bottoms}</Badge>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Watch" size={14} />
                  Платья
                </Label>
                {isEditing ? (
                  <Select 
                    value={preferences.clothing.dress}
                    onValueChange={(value) => setPreferences(prev => ({
                      ...prev,
                      clothing: { ...prev.clothing, dress: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="XS">XS</SelectItem>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-2 bg-muted rounded-md">
                    <Badge>{preferences.clothing.dress}</Badge>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Footprints" size={14} />
                  Обувь
                </Label>
                {isEditing ? (
                  <Select 
                    value={preferences.clothing.shoes}
                    onValueChange={(value) => setPreferences(prev => ({
                      ...prev,
                      clothing: { ...prev.clothing, shoes: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 11 }, (_, i) => 35 + i).map(size => (
                        <SelectItem key={size} value={size.toString()}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-2 bg-muted rounded-md">
                    <Badge>{preferences.clothing.shoes}</Badge>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="measurements" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Рост (см)</Label>
                {isEditing ? (
                  <Input 
                    type="number"
                    value={preferences.measurements.height}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, height: e.target.value }
                    }))}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md text-sm">
                    {preferences.measurements.height} см
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Вес (кг)</Label>
                {isEditing ? (
                  <Input 
                    type="number"
                    value={preferences.measurements.weight}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, weight: e.target.value }
                    }))}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md text-sm">
                    {preferences.measurements.weight} кг
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Обхват груди (см)</Label>
                {isEditing ? (
                  <Input 
                    type="number"
                    value={preferences.measurements.bust}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, bust: e.target.value }
                    }))}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md text-sm">
                    {preferences.measurements.bust} см
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Обхват талии (см)</Label>
                {isEditing ? (
                  <Input 
                    type="number"
                    value={preferences.measurements.waist}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, waist: e.target.value }
                    }))}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md text-sm">
                    {preferences.measurements.waist} см
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Обхват бедер (см)</Label>
                {isEditing ? (
                  <Input 
                    type="number"
                    value={preferences.measurements.hips}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      measurements: { ...prev.measurements, hips: e.target.value }
                    }))}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md text-sm">
                    {preferences.measurements.hips} см
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="brands" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Предпочитаемые магазины</Label>
                <Badge variant="outline">{preferences.brands.length} выбрано</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {availableBrands.map((brand) => (
                  <Card 
                    key={brand.name}
                    className={`cursor-pointer transition-all border-2 ${
                      preferences.brands.includes(brand.name) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted hover:border-primary/50'
                    } ${!isEditing && 'pointer-events-none'}`}
                    onClick={() => isEditing && toggleBrand(brand.name)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{brand.logo}</span>
                          <p className="text-sm font-medium">{brand.name}</p>
                        </div>
                        {preferences.brands.includes(brand.name) && (
                          <Icon name="Check" size={16} className="text-primary" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Город доставки</Label>
                {isEditing ? (
                  <Input 
                    value={preferences.deliveryCity}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      deliveryCity: e.target.value
                    }))}
                    placeholder="Введите город"
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md text-sm flex items-center gap-2">
                    <Icon name="MapPin" size={14} />
                    {preferences.deliveryCity}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Ценовой диапазон</Label>
                <div className="grid grid-cols-2 gap-2">
                  {isEditing ? (
                    <>
                      <Input 
                        type="number"
                        placeholder="От"
                        value={preferences.priceRange.min}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          priceRange: { ...prev.priceRange, min: e.target.value }
                        }))}
                      />
                      <Input 
                        type="number"
                        placeholder="До"
                        value={preferences.priceRange.max}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          priceRange: { ...prev.priceRange, max: e.target.value }
                        }))}
                      />
                    </>
                  ) : (
                    <div className="col-span-2 p-2 bg-muted rounded-md text-sm">
                      {preferences.priceRange.min} ₽ - {preferences.priceRange.max} ₽
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-3 block">Любимые цвета</Label>
                <div className="flex flex-wrap gap-2">
                  {['Черный', 'Белый', 'Серый', 'Бежевый', 'Синий', 'Красный', 'Зеленый', 'Желтый'].map((color) => (
                    <Badge
                      key={color}
                      variant={preferences.colors.includes(color) ? 'default' : 'outline'}
                      className={`cursor-pointer ${!isEditing && 'pointer-events-none'}`}
                      onClick={() => isEditing && toggleColor(color)}
                    >
                      {color}
                      {preferences.colors.includes(color) && (
                        <Icon name="Check" size={12} className="ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium mb-3 block">Предпочитаемые стили</Label>
                <div className="flex flex-wrap gap-2">
                  {['Business', 'Casual', 'Evening', 'Sport', 'Street'].map((style) => (
                    <Badge
                      key={style}
                      variant={preferences.styles.includes(style) ? 'default' : 'outline'}
                      className={`cursor-pointer ${!isEditing && 'pointer-events-none'}`}
                      onClick={() => isEditing && toggleStyle(style)}
                    >
                      {style}
                      {preferences.styles.includes(style) && (
                        <Icon name="Check" size={12} className="ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-4 border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Персонализированные рекомендации</p>
                <p className="text-xs text-muted-foreground">
                  На основе твоих параметров мы подбираем товары нужного размера, которые есть в наличии в выбранных магазинах города {preferences.deliveryCity}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default UserPreferences;
