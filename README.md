## Tempalte [sic]

Create type safe re-usable template strings.

```typescript
  const salute = tempalte<{
    salutation: string,
    entity: string,
  }>()(
    "${salutation} ${entity}!"
  ),

  expect(salute({
    salutation: 'Hello',
    entity: 'Word',
  }).toBe('Hello World!');
```