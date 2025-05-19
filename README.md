# stylelint-base-config

--- 

Данный пакет объединяет популярные пресеты Stylelint с набором ```кастомных правил```, ориентированных на крупные SCSS-кодовые базы: контроль сложности, запрет неявных зависимостей и принудительное использование дизайн-токенов.

--- 

## Установка
NPM: 
```bash 
npm install --save-dev stylelint @e_fellow/stylelint-base-config
```

YARN:
```bash 
yarn add -D stylelint @e_fellow/stylelint-base-config
```

После установки в ```.stylelintrc.js```:
```js
module.exports = { extends: ['@e_fellow/stylelint-base-config'], };
```

| Категория | Элемент | Назначение |
|-----------|---------|------------|
| **Presets (extends)** | **stylelint-config-standard** | Базовые форматные и лучшие практики от команды Stylelint. |
| | **stylelint-config-idiomatic-order** | Жёсткий порядок свойств по методологии Idiomatic CSS (`stylelint-order`). |
| **Plugins (plugins)** | **stylelint-scss** | SCSS-специфичный синтаксис и правила (`scss/at-rule-no-unknown`). |
| | **stylelint-high-performance-animation** | Предупреждает о затратных свойствах в @keyframes / transition. |
| | **custom plugins** | Собственные правила — см. таблицу ниже. |

---

## Кастомные правила

| Имя правила | Значение по-умолчанию | Что проверяет |
|-------------|-----------------------|---------------|
| `basic-rules/max-nesting-depth` | `3` | Глубина вложенности селекторов. |
| `basic-rules/no-hardcoded-colors` | `true` | Запрещает прямые HEX / RGB / hsl-значения и цвет-keywords, если они не внутри `var(--token)` или `$variable`. |
| `basic-rules/no-literal-z-index` | `true` | Запрещает числовые `z-index`; допускает токены, `auto`, `calc()`. |
| `basic-rules/no-extend` | `true` | Запрет `@extend`; используем миксины / утилити-классы. |
| `basic-rules/max-control-nesting` | `1` | Контроль `@if` / `@for` / `@each` / `@while` – не глубже 1 уровня. |

---

## Дополнительные настройки правил

| Правило | Настройка | Причина |
|---------|-----------|---------|
| `color-hex-length` | `"long"` | 6-значный HEX для читаемости (`#ffffff`). |
| `at-rule-no-unknown` | `null` | Отключено в пользу `scss/at-rule-no-unknown`. |
| `scss/at-rule-no-unknown` | `true` | Ловит опечатки в SCSS-директивах. |
| `selector-pseudo-class-no-unknown` | `true` + `ignorePseudoClasses: ['global']` | Разрешаем `:global` из CSS-Modules. |
| `unit-no-unknown` | `null` | Допускаем проектные единицы (`rpx` и т. д.). |
| `plugin/no-low-performance-animation-properties` | `true` + ignore paint-props | Запрет анимации свойств, вызывающих layout. |
| `selector-type-no-unknown` | `true` + `ignore: ['custom-elements', 'default-namespace']` | Разрешаем Web-Components и namespaced SVG. |
| `selector-type-case` | `'lower'` + ignore regex | Тип-селекторы в нижнем регистре. |
| `property-no-unknown` | `null` | Разрешаем экспериментальные свойства. |

---

### basic-rules/max-nesting-depth

Пример использования:
```scss
/* ✅ depth 2 — OK */
.nav {
  .item { color: red; }
}

/* ❌ depth 4 — ошибка */
.a { .b { .c { .d { } } } }
```

### basic-rules/no-hardcoded-colors

Пример использования:
```scss
/* ✅ допускается токен */
.card {
  border-color: var(--border-color);
}

$text-color: #222;

/* ✅ допускается токен */
.title {
  color: $text-color;
}

/* ❌ жёсткий HEX */
.title2 {
  color: red;
}
```

### basic-rules/no-literal-z-index

Пример использования:
```scss
/* ✅ переменная */
.modal { z-index: $z-modal; }

/* ❌ число */
.dropdown { z-index: 9999; }
```

### basic-rules/no-extend

Пример использования:
```scss
/* ✅ миксин */
@include button-base;

/* ❌ @extend */
.btn-danger { @extend .btn; }
```

### basic-rules/max-control-nesting

Пример использования:
```scss
/* ✅ depth 1 */
@each $c in red {
  @if $c == red { color: red; }
}

/* ❌ depth 2 */
@for $i from 1 through 3 {
  @if $i > 1 {
    @each $c in red { }
  }
}
```

# Лицензия MIT

