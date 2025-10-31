import { useCallback, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface PhotoUploadProps {
  onImageUpload: (imageUrl: string) => void;
  mode?: 'analyze' | 'search';
}

const PhotoUpload = ({ onImageUpload, mode = 'analyze' }: PhotoUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
        toast({
          title: 'Фото загружено',
          description: mode === 'search' ? 'Ищем похожие товары...' : 'Анализируем твой образ...',
        });
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, выберите изображение',
        variant: 'destructive',
      });
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-white to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name={mode === 'search' ? 'ScanSearch' : 'Upload'} size={20} />
          {mode === 'search' ? 'Найди похожие вещи' : 'Загрузи фото'}
        </CardTitle>
        <CardDescription>
          {mode === 'search' 
            ? 'Загрузи фото с понравившимся образом, и мы найдём похожие товары в магазинах' 
            : 'Добавь фото своего образа для AI-анализа'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging ? 'border-primary bg-primary/5 scale-105' : 'border-gray-300'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="file-upload"
          />
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Image" size={32} className="text-white" />
            </div>
            <div>
              <p className="text-lg font-medium mb-1">Перетащи фото сюда</p>
              <p className="text-sm text-muted-foreground">или нажми для выбора файла</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button variant="outline" className="w-full" onClick={() => document.getElementById('file-upload')?.click()}>
            <Icon name="FolderOpen" size={18} className="mr-2" />
            Галерея
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              toast({
                title: 'Камера',
                description: 'Функция в разработке',
              });
            }}
          >
            <Icon name="Camera" size={18} className="mr-2" />
            Камера
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoUpload;