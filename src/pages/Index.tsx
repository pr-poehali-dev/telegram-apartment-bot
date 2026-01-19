import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const APARTMENT_IMAGE = 'https://cdn.poehali.dev/projects/d38555b3-058f-4425-8ec1-018ae1fc4a10/files/35afefce-5f12-415f-a0e3-48d0fbc6a929.jpg';

const PRICES = [
  { duration: '1 сутки', price: 1500, popular: false },
  { duration: '2 суток', price: 2500, popular: true },
  { duration: '3 суток', price: 3500, popular: false },
  { duration: 'Неделя', price: 4500, popular: false },
];

const REVIEWS = [
  { name: 'Анна М.', rating: 5, text: 'Отличная квартира! Чистая, уютная, всё как на фото. Обязательно вернёмся!' },
  { name: 'Дмитрий К.', rating: 5, text: 'Прекрасное расположение, удобная планировка. Хозяева приветливые.' },
  { name: 'Елена С.', rating: 5, text: 'Всё на высшем уровне! Рекомендую всем, кто ищет комфортное жильё.' },
];

const SPECIAL_OFFERS = [
  { title: 'Раннее бронирование', discount: '10%', description: 'При бронировании за 2 недели' },
  { title: 'Долгосрочная аренда', discount: '15%', description: 'При аренде от 7 дней' },
  { title: 'Постоянным клиентам', discount: '20%', description: 'Скидка при повторном заселении' },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('main');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
    message: '',
  });
  const { toast } = useToast();

  const handleBooking = () => {
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.checkIn || !bookingForm.checkOut) {
      toast({
        title: '⚠️ Заполните все поля',
        description: 'Для бронирования необходимо указать имя, телефон и даты',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: '✅ Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время для подтверждения',
    });
    
    setActiveTab('payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-50 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Home" size={28} className="text-white" />
              <div>
                <h1 className="text-xl font-semibold">Квартира посуточно</h1>
                <p className="text-sm opacity-90">Уютное жильё в центре города</p>
              </div>
            </div>
            <Icon name="Heart" size={24} className="text-white" />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-[88px] z-40 bg-white shadow-sm">
            <TabsList className="w-full grid grid-cols-4 rounded-none h-auto p-0 bg-white">
              <TabsTrigger value="main" className="rounded-none border-b-2 data-[state=active]:border-primary py-3 gap-1 flex-col">
                <Icon name="Home" size={20} />
                <span className="text-xs">Главная</span>
              </TabsTrigger>
              <TabsTrigger value="prices" className="rounded-none border-b-2 data-[state=active]:border-primary py-3 gap-1 flex-col">
                <Icon name="DollarSign" size={20} />
                <span className="text-xs">Цены</span>
              </TabsTrigger>
              <TabsTrigger value="booking" className="rounded-none border-b-2 data-[state=active]:border-primary py-3 gap-1 flex-col">
                <Icon name="Calendar" size={20} />
                <span className="text-xs">Бронь</span>
              </TabsTrigger>
              <TabsTrigger value="more" className="rounded-none border-b-2 data-[state=active]:border-primary py-3 gap-1 flex-col">
                <Icon name="Menu" size={20} />
                <span className="text-xs">Ещё</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="main" className="mt-0 p-4 space-y-6">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={APARTMENT_IMAGE} 
                alt="Квартира" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h2 className="text-white text-2xl font-bold mb-2">Современная квартира</h2>
                <div className="flex items-center gap-4 text-white/90 text-sm">
                  <span className="flex items-center gap-1">
                    <Icon name="MapPin" size={16} />
                    Центр города
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Users" size={16} />
                    До 4 гостей
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Wifi" size={16} />
                    WiFi
                  </span>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Icon name="Sparkles" size={20} className="text-primary" />
                  Особенности квартиры
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: 'Bed', label: 'Двуспальная кровать' },
                    { icon: 'Tv', label: 'Smart TV' },
                    { icon: 'Bath', label: 'Ванная комната' },
                    { icon: 'Microwave', label: 'Кухня' },
                    { icon: 'Wind', label: 'Кондиционер' },
                    { icon: 'Car', label: 'Парковка' },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Icon name={feature.icon as any} size={18} className="text-primary" />
                      <span>{feature.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-primary/10 to-blue-50 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Percent" size={20} className="text-primary" />
                  Специальные предложения
                </h3>
                <div className="space-y-3">
                  {SPECIAL_OFFERS.map((offer, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-sm">{offer.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{offer.description}</p>
                        </div>
                        <Badge className="bg-primary">{offer.discount}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prices" className="mt-0 p-4 space-y-4">
            <h2 className="text-2xl font-bold mb-6">Тарифы и цены</h2>
            {PRICES.map((price, idx) => (
              <Card key={idx} className={price.popular ? 'border-primary border-2 shadow-lg' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{price.duration}</h3>
                        {price.popular && <Badge className="bg-primary">Популярно</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Комфортное проживание</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{price.price.toLocaleString()}₽</div>
                      <p className="text-xs text-muted-foreground">за период</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => setActiveTab('booking')}
                  >
                    <Icon name="Calendar" size={18} className="mr-2" />
                    Забронировать
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Info" size={18} className="text-primary" />
                  Что включено в стоимость
                </h3>
                <ul className="space-y-2 text-sm">
                  {[
                    'Уборка перед заездом',
                    'Постельное бельё и полотенца',
                    'WiFi и ТВ',
                    'Все коммунальные услуги',
                    'Парковочное место',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="booking" className="mt-0 p-4 space-y-4">
            <h2 className="text-2xl font-bold mb-6">Бронирование</h2>
            
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ваше имя</label>
                  <Input 
                    placeholder="Иван Иванов"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Телефон</label>
                  <Input 
                    type="tel"
                    placeholder="+7 (900) 123-45-67"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Заезд</label>
                    <Input 
                      type="date"
                      value={bookingForm.checkIn}
                      onChange={(e) => setBookingForm({...bookingForm, checkIn: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Выезд</label>
                    <Input 
                      type="date"
                      value={bookingForm.checkOut}
                      onChange={(e) => setBookingForm({...bookingForm, checkOut: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Количество гостей</label>
                  <Input 
                    type="number"
                    min="1"
                    max="4"
                    value={bookingForm.guests}
                    onChange={(e) => setBookingForm({...bookingForm, guests: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Комментарий (необязательно)</label>
                  <Textarea 
                    placeholder="Дополнительные пожелания..."
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                    rows={3}
                  />
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleBooking}
                >
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить заявку
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Icon name="Clock" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-900 mb-1">Время заезда и выезда</p>
                    <p className="text-amber-700">Заезд после 14:00, выезд до 12:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="more" className="mt-0 p-4 space-y-4">
            <h2 className="text-2xl font-bold mb-6">Дополнительно</h2>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="CreditCard" size={20} className="text-primary" />
                  Оплата бронирования
                </h3>
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <p className="text-sm mb-3">Для подтверждения брони необходимо внести предоплату:</p>
                  <div className="bg-white rounded-lg p-4 border-2 border-dashed border-primary">
                    <p className="text-xs text-muted-foreground mb-2">Номер карты для перевода:</p>
                    <p className="text-lg font-mono font-bold text-center tracking-wider">
                      2200 7021 1799 0650
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  После оплаты отправьте скриншот чека в WhatsApp или Telegram
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="MessageCircle" size={20} className="text-primary" />
                  Связаться с нами
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer">
                      <Icon name="Send" size={18} className="mr-3 text-blue-500" />
                      Написать в Telegram
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://wa.me/79001234567" target="_blank" rel="noopener noreferrer">
                      <Icon name="Phone" size={18} className="mr-3 text-green-600" />
                      Написать в WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="tel:+79001234567">
                      <Icon name="PhoneCall" size={18} className="mr-3 text-primary" />
                      Позвонить: +7 (900) 123-45-67
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Star" size={20} className="text-primary" />
                  Отзывы гостей
                </h3>
                <div className="space-y-4">
                  {REVIEWS.map((review, idx) => (
                    <div key={idx} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-sm">{review.name}</p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Icon key={i} name="Star" size={14} className="text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <Icon name="MapPin" size={32} className="mx-auto mb-3 text-white" />
                <h3 className="font-semibold mb-2">Удобное расположение</h3>
                <p className="text-sm opacity-90">
                  5 минут до метро • Рядом магазины и кафе • Тихий двор
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="mt-0 p-4 space-y-4">
            <div className="text-center py-8">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={48} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Заявка принята!</h2>
              <p className="text-muted-foreground mb-6">Мы свяжемся с вами в ближайшее время</p>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Для завершения бронирования:</h3>
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <p className="text-sm mb-3">1. Переведите предоплату на карту:</p>
                    <div className="bg-white rounded-lg p-4 border-2 border-primary">
                      <p className="text-lg font-mono font-bold text-center tracking-wider">
                        2200 7021 1799 0650
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm">2. Отправьте чек в WhatsApp или Telegram</p>
                  </div>
                </CardContent>
              </Card>

              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => setActiveTab('main')}
              >
                <Icon name="Home" size={18} className="mr-2" />
                Вернуться на главную
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
