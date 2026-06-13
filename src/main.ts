import { writeFileSync } from 'fs';
import { RendererFactory, RendererType } from './factories/RendererFactory';
import { Section } from './nodes/Section';
import { Paragraph } from './nodes/Paragraph';
import { List } from './nodes/List';

function createDocument(format: RendererType): string {
  const renderer = RendererFactory.create(format);
  const doc = new Section("Структурні патерни", renderer, [], 1);

  const patterns = new Section("Основні патерни", renderer, [
    new Paragraph("Розглянемо два важливих структурних патерни.", renderer),
    new Section("Composite", renderer, [
      new Paragraph("Дозволяє створювати деревоподібні структури об'єктів.", renderer),
      new List(["Спрощує структуру", "Гнучкий код", "Легка підтримка"], renderer)
    ], 2),
    new Section("Bridge", renderer, [
      new Paragraph("Розділяє абстракцію та реалізацію.", renderer),
      new List(["Незалежні зміни", "Краща масштабованість"], renderer)
    ], 2)
  ], 2);

  doc.add(patterns);
  return doc.render();
}

const formatArg = (process.argv[2] || 'markdown').toLowerCase() as RendererType;
const outputArg = process.argv[3];

const content = createDocument(formatArg);
const renderer = RendererFactory.create(formatArg);
const result = renderer.wrapDocument(content);

if (outputArg) {
  writeFileSync(outputArg, result);
  console.log(`Document successfully saved to ${outputArg}`);
} else {
  console.log(result);
}
