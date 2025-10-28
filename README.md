🛍️ Product Catalog - SPA приложение
https://img.shields.io/badge/React-18.2.0-blue
https://img.shields.io/badge/TypeScript-5.0-blue
https://img.shields.io/badge/Next.js-14.0-black
https://img.shields.io/badge/Redux-Toolkit-purple
https://img.shields.io/badge/Tailwind-CSS-cyan

SPA приложение для управления каталогом продуктов с полным CRUD функционалом, созданное в рамках тестового задания.

✨ Особенности
📱 Полностью адаптивный интерфейс

⚡ Быстрое и отзывчивое SPA

🎯 Полное соответствие ТЗ

🌟 Все бонусные функции реализованы

🚀 Функциональность
✅ Основные требования
Список продуктов с карточками одинаковой высоты

Система лайков с визуальной индикацией

Удаление продуктов

Фильтрация по избранному и всем продуктам

Подробная страница продукта

Создание продуктов с валидацией формы

Хранение данных в Redux store

🎁 Бонусные функции
📄 Пагинация с удобной навигацией

✏️ Редактирование существующих продуктов

🔍 Расширенная фильтрация по категориям

🔎 Поиск в реальном времени по названию, описанию и бренду

🛠 Технологии
Frontend: React 18, Next.js 14, TypeScript

State Management: Redux Toolkit

Styling: Tailwind CSS

API: DummyJSON API

Deployment: GitHub Pages

📦 Установка и запуск
Предварительные требования
Node.js 18+

npm или yarn

Локальная разработка
Клонируйте репозиторий

bash
git clone https://github.com/ваш-username/product-catalog.git
cd product-catalog
Установите зависимости

bash
npm install
Запустите в режиме разработки

bash
npm run dev
Откройте в браузере

text
http://localhost:3000
Продакшен сборка
bash
# Сборка проекта
npm run build

# Экспорт статических файлов
npm run export

# Деплой на GitHub Pages
npm run deploy
🎯 Структура проекта
text
product-catalog/
├── components/          # React компоненты
│   ├── ProductCard.tsx  # Карточка продукта
│   ├── ProductList.tsx  # Список продуктов
│   ├── ProductForm.tsx  # Форма создания/редактирования
│   └── Pagination.tsx   # Компонент пагинации
├── pages/               # Next.js страницы
│   ├── products/        # Страницы продуктов
│   ├── create-product.tsx
│   └── _app.tsx
├── store/               # Redux store
│   ├── store.ts
│   └── productsSlice.ts
├── types/               # TypeScript типы
│   └── product.ts
└── styles/              # Глобальные стили
    └── globals.css
📱 Маршруты приложения
/ - Главная страница (редирект на /products)

/products - Список всех продуктов

/products/:id - Детальная страница продукта

/create-product - Создание нового продукта

/create-product?edit=:id - Редактирование существующего продукта

🎨 Ключевые компоненты
ProductCard
Отображение продукта в карточке

Лайк/анлайк функционал

Удаление продукта

Обрезанный текст для одинаковой высоты

Клик для перехода на детальную страницу

ProductList
Сетка продуктов

Поиск в реальном времени

Фильтрация по категориям и избранному

Интеграция с пагинацией

ProductForm
Создание и редактирование продуктов

Валидация обязательных полей

Предпросмотр изображения

Поддержка всех категорий

🔧 API
Приложение использует DummyJSON API для получения демо-данных:

javascript
// Получение списка продуктов
GET https://dummyjson.com/products?limit=100
📊 Состояние приложения (Redux)
typescript
interface ProductsState {
  items: Product[];           // Все продукты
  filteredItems: Product[];   // Отфильтрованные продукты
  favorites: number[];        // ID избранных продуктов
  currentPage: number;        // Текущая страница
  itemsPerPage: number;       // Продуктов на странице
  searchQuery: string;        // Поисковый запрос
  filterCategory: string;     // Выбранная категория
}
🚀 Деплой
Приложение автоматически деплоится на GitHub Pages при пуше в main ветку.

Живое приложение: https://ваш-username.github.io/product-catalog

🧪 Тестирование
Для проверки функциональности:

Откройте приложение

Проверьте лайки - кликните на ❤️ в карточке

Удалите продукт - кликните на 🗑️

Создайте продукт - через форму создания

Отредактируйте продукт - через кнопку "Edit"

Используйте поиск и фильтры

👨‍💻 Разработчик
[Ваше Имя]

📧 Email: ваш.email@example.com

💼 LinkedIn: [ссылка]

📱 Telegram: [@username]

📄 Лицензия
MIT License - смотрите файл LICENSE для деталей.
