# Домашнє завдання — Тема 7. Структурні патерни: Компонувальник та Міст

Система генерації документів із деревоподібною структурою елементів та підтримкою кількох форматів виводу.

## Патерни

### Composite (Компонувальник)
Клас `Section` може містити довільну кількість дочірніх вузлів (`Section`, `Paragraph`, `List`). Всі вузли реалізують інтерфейс `DocNode` з методом `render(renderer)`, тому клієнтський код рендерить усю ієрархію одним викликом без знання про вкладеність.

### Bridge (Міст)
Розділення ієрархії вузлів документа від ієрархії рендерерів:
- **Абстракція**: `DocNode` (вузли документа делегують форматування рендереру)
- **Реалізація**: `BaseRenderer` → `HTMLRenderer` | `MarkdownRenderer` | `PlainTextRenderer`

Завдяки Мосту нові формати додаються без змін у вузлах, а нові типи вузлів — без змін у рендерерах.

## Структура проєкту

```
src/
├── interfaces/
│   ├── DocNode.ts
│   └── DocRenderer.ts
├── nodes/
│   ├── Section.ts       # Composite
│   ├── Paragraph.ts
│   └── List.ts
├── renderers/
│   ├── BaseRenderer.ts
│   ├── HTMLRenderer.ts
│   ├── MarkdownRenderer.ts
│   └── PlainTextRenderer.ts
├── factories/
│   └── RendererFactory.ts
└── main.ts
```

## Запуск

```bash
npm install
npx ts-node src/main.ts
```

Для вибору формату передайте аргумент: `html`, `markdown` або `plain` (за замовчуванням — усі три).
