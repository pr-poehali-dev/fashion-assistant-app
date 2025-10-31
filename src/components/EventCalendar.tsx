import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

const EventCalendar = () => {
  const [events] = useState([
    {
      id: 1,
      title: 'Деловая встреча',
      date: '15 ноября',
      time: '14:00',
      style: 'Business',
      outfit: 'Готов',
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: 2,
      title: 'Вечеринка',
      date: '18 ноября',
      time: '20:00',
      style: 'Evening',
      outfit: 'Не готов',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 3,
      title: 'Спортзал',
      date: '20 ноября',
      time: '08:00',
      style: 'Sport',
      outfit: 'Готов',
      color: 'from-green-400 to-green-600'
    }
  ]);

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Icon name="CalendarDays" size={20} />
              События
            </span>
            <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
              <Icon name="Plus" size={16} className="mr-1" />
              Добавить
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.map((event) => (
            <Card key={event.id} className="border-2">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Icon name="Clock" size={14} />
                      {event.date} в {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {event.style}
                      </Badge>
                      <Badge 
                        variant={event.outfit === 'Готов' ? 'default' : 'secondary'}
                        className={event.outfit === 'Готов' ? 'bg-green-500' : ''}
                      >
                        <Icon name={event.outfit === 'Готов' ? 'Check' : 'AlertCircle'} size={12} className="mr-1" />
                        {event.outfit}
                      </Badge>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center`}>
                    <Icon name="Shirt" size={20} className="text-white" />
                  </div>
                </div>
                {event.outfit === 'Не готов' && (
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    <Icon name="Sparkles" size={14} className="mr-1" />
                    Подобрать образ
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-pink-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">Не забудь запланировать образы</p>
              <p className="text-xs text-muted-foreground">AI поможет подобрать идеальный лук</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCalendar;
