[![CI](https://github.com/prmichaelsen/tempalte/actions/workflows/main.yml/badge.svg)](https://github.com/prmichaelsen/tempalte/actions/workflows/main.yml)

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
