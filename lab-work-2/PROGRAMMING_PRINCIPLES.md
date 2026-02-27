# Programming Principles in This Project

Цей документ описує принципи програмування, яких дотримано в проєкті.

## 1. SOLID Principles

### S - Single Responsibility Principle
Кожен клас має одну відповідальність:
- Класи підписок (`DomesticSubscription`, `EducationalSubscription`, `PremiumSubscription`) відповідають тільки за зберігання даних.
- Фабрики (`WebSite`, `MobileApp`, `ManagerCall`) відповідають тільки за створення підписок.
- [Посилання на task1.ts](lib/patterns/task1.ts)

### O - Open/Closed Principle
Класи відкриті для розширення, але закриті для модифікації:
- Можна додати новий тип підписки, створивши новий клас, не змінюючи існуючі фабрики.
- [Посилання на task1.ts](lib/patterns/task1.ts#L40-L60)

### L - Liskov Substitution Principle
Підкласи можуть замінювати батьківські класи:
- Всі фабрики реалізують інтерфейс `SubscriptionFactory` і можуть використовуватися взаємозамінно.
- [Посилання на task1.ts](lib/patterns/task1.ts#L35-L60)

### I - Interface Segregation Principle
Інтерфейси розділені за призначенням:
- `Subscription` — тільки для підписок.
- `SubscriptionFactory` — тільки для фабрик підписок.
- `Builder` — тільки для будівельників персонажів.
- [Посилання на інтерфейси](lib/patterns/)

### D - Dependency Inversion Principle
Залежність від абстракцій, а не від конкретних реалізацій:
- `Director` залежить від абстракції `Builder`, а не від конкретних `HeroBuilder` чи `EnemyBuilder`.
- [Посилання на Director](lib/patterns/task5.ts#L85-L100)

## 2. DRY (Don't Repeat Yourself)
- Спільна логика винесена в інтерфейси.
- Методи builder'ів повертають `this` для уникнення повторень.
- [Посилання на fluent interface](lib/patterns/task5.ts#L15-L30)

## 3. KISS (Keep It Simple, Stupid)
- Кожен шаблон реалізовано максимально просто.
- Чітке розділення відповідальності між файлами.

## 4. YAGNI (You Aren't Gonna Need It)
- Реалізовано тільки необхідний функціонал для демонстрації шаблонів.