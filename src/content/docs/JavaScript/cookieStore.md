---
title: cookieStore
description: es una API moderna de JavaScript que permite leer, escribir y borrar cookies de manera asíncrona basada en promesas.
---

¡Claro! Te armo una guía corta y clara sobre `cookieStore`:

---

## ¿Qué es `cookieStore`?

`cookieStore` es una API moderna de JavaScript que permite leer, escribir y borrar cookies de manera **asíncrona** y **prometedora** (`Promise-based`), a diferencia del acceso tradicional a `document.cookie`, que es más incómodo de manejar.

Es parte del estándar **Cookie Store API** y funciona principalmente en **Service Workers** y **Documentos seguros** (`https`).

---

## Operaciones básicas

### 1. Leer cookies

```javascript
const cookies = await cookieStore.getAll()
console.log(cookies)
```

Cada cookie es un objeto con propiedades como: `name`, `value`, `path`, `domain`, `expires`, etc.

Leer una cookie específica:

```javascript
const cookie = await cookieStore.get('miCookie')
console.log(cookie?.value)
```

### 2. Escribir cookies

```javascript
await cookieStore.set({
    name: 'usuario',
    value: 'Juan',
    path: '/',
    expires: Date.now() + 60 * 60 * 1000, // 1 hora
})
```

O versión corta:

```javascript
await cookieStore.set('tema', 'oscuro')
```

### 3. Borrar cookies

```javascript
await cookieStore.delete('usuario')
```

Borra una cookie por su nombre.

---

## Eventos

Puedes **escuchar cambios** de cookies:

```javascript
cookieStore.addEventListener('change', (event) => {
    for (const cookie of event.changed) {
        console.log('Cookie cambiada:', cookie)
    }
    for (const cookie of event.deleted) {
        console.log('Cookie eliminada:', cookie)
    }
})
```

Ideal para sincronizar estado entre pestañas o workers.

---

## Compatibilidad

-   En caso de que no funcione en el navegador se puede usar un polifill.
