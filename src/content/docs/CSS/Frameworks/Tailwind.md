# [Tailwind CSS](https://tailwindcss.com/)

Tailwind CSS es un framework **utility-first** que proporciona clases de bajo nivel para construir interfaces web directamente en el HTML. Permite una gran **flexibilidad**, **rapidez de desarrollo** y **consistencia visual**.

---

## ✅ Ventajas de usar Tailwind

-   🔧 **CSS Utility-first**: clases reutilizables para cada propiedad de estilo.
-   🎨 **Configuración personalizada**: puedes adaptar el tema a tus necesidades.
-   ⚡ **Compilación optimizada**: elimina clases no utilizadas (`purge`) y reduce el tamaño final del CSS.
-   🏗️ **Maquetación directa en HTML**: no necesitas escribir CSS personalizado para todo.
-   📦 **Consistencia visual**: diseño sistematizado mediante escalas predefinidas.
-   🔁 **Fomenta la componetización** de la UI.
-   📋 **Componentes reutilizables** de proyectos como [Flowbite](https://flowbite.com/), [DaisyUI](https://daisyui.com/), etc.

---

## ❌ Desventajas de Tailwind

-   🧱 HTML **verboso** con muchas clases.
-   👀 **Difícil de leer** al principio si no estás familiarizado.
-   🧹 **Mantenimiento de clases** complejo en proyectos grandes.
-   📘 **Curva de aprendizaje** para principiantes.
-   🔧 **Dependencia de herramientas externas**.
-   🧪 **Requiere configuración inicial** para aprovechar todo su potencial.
-   🏷️ **Pérdida de semántica**: se tiende a usar `<div>` con clases en lugar de etiquetas semánticas (`<card>`, `<section>`, etc.).

---

## 🚀 Instalación de Tailwind CSS

### 🔹 Opción rápida (CDN - Solo para pruebas)

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

> ⚠️ **No recomendado para producción.**

---

### 🔹 Instalación en un proyecto (Vite o CLI)

```bash
# Vite
npm install tailwindcss @tailwindcss/vite

# CLI standalone
npm install -D tailwindcss @tailwindcss/cli
npx tailwindcss init
```

---

## ⚙️ Configuración básica

### Vite Plugin (`vite.config.js`)

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [tailwindcss()],
})
```

### Archivo de entrada `input.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Comando para compilar

```bash
npx tailwindcss -i ./input.css -o ./assets/output.css --watch
```

-   Quita el script CDN si lo usabas.
-   Asegúrate de importar `output.css` en tu HTML.

---

## 🧠 IntelliSense en VSCode

Instala la extensión **Tailwind CSS IntelliSense** para autocompletado, documentación emergente y más.

Además, si `@theme` da error en los `.css`, ya que es algo propio de tailwind y no de css asocia los archivos css a tailwind:

```json
# .vscode/settings.json
{
    "files.associations": {
        "*.css": "tailwindcss"
    }
}
```

---

## 🎨 Customización del tema

Tailwind permite modificar su tema predeterminado desde el archivo `tailwind.config.js`.

### Variables personalizadas

```css
@theme {
    --color-custom: #09f;
    --font-inter: 'Inter', sans-serif;
}
```

### @apply para clases reutilizables

```css
.custom-button {
    @apply p-2 size-10 xs:size-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform;
}
```

### 🅰️ Añadir fuentes personalizadas

```css
@font-face {
    font-family: 'Inter';
    src: url('https://fonts.gstatic.com/s/inter/v3/UcCo7F8a1b4d5f6e2a4c.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}
```

Luego la puedes usar vía Tailwind:

```css
@theme {
    --font-inter: 'Inter', sans-serif;
}
```

---

## 🌀 Animaciones

### Animaciones personalizadas

Puedes definir animaciones con `@keyframes` y aplicar con `@apply`:

```css
@keyframes wiggle {
    0%,
    100% {
        transform: rotate(-3deg);
    }
    50% {
        transform: rotate(3deg);
    }
}

.wiggle {
    @apply animate-wiggle;
}
```

### Plugin de animaciones

```bash
npm install @midudev/tailwind-animations
```

**Configuración**:

```js
// tailwind.config.js
import animations from '@midudev/tailwind-animations'

export default {
    plugins: [animations],
}
```

```css
/* input.css */
@plugin '@midudev/tailwind-animations';
```

---

## 📝 Plugins útiles

-   [`@tailwindcss/forms`](https://tailwindcss.com/docs/plugins#forms)
-   [`@tailwindcss/typography`](https://tailwindcss.com/docs/typography-plugin) (ideal para contenido largo)
-   [`@tailwindcss/aspect-ratio`](https://tailwindcss.com/docs/aspect-ratio)

---

## 📐 Breakpoints

Tailwind usa estas media queries por defecto:

| Clave | Tamaño mínimo |
| ----- | ------------- |
| `sm`  | 640px         |
| `md`  | 768px         |
| `lg`  | 1024px        |
| `xl`  | 1280px        |
| `2xl` | 1536px        |

---

## 👥 Utilidad `group` y `peer`

Permite aplicar estilos a elementos hijos o hermanos cuando un evento ocurre:

```html
<div class="group">
    <button class="group-hover:rotate-12 transition-transform">Hover me</button>
</div>
```

# Cheat Sheet

## 📦 Layout

| Clase                           | Descripción                |
| ------------------------------- | -------------------------- |
| `container`                     | Contenedor responsivo      |
| `box-border`                    | Modelo de caja border-box  |
| `box-content`                   | Modelo de caja content-box |
| `block` `inline` `inline-block` | Comportamiento de display  |
| `flex` `inline-flex`            | Contenedor flex            |
| `grid`                          | Contenedor grid            |
| `hidden`                        | Oculta el elemento         |

## 🧭 Flexbox & Grid

| Clase                 | Descripción                |
| --------------------- | -------------------------- |
| `flex-row` `flex-col` | Dirección de los elementos |
| `items-center`        | Alineación vertical        |
| `justify-center`      | Alineación horizontal      |
| `gap-x-4` `gap-y-2`   | Espaciado entre items      |
| `grid-cols-3`         | N° de columnas en grid     |

## 📐 Spacing

| Clase        | Descripción                      |
| ------------ | -------------------------------- |
| `m-4` `mt-2` | Margen                           |
| `p-4` `px-2` | Relleno (padding)                |
| `space-x-4`  | Espaciado horizontal entre hijos |
| `space-y-4`  | Espaciado vertical entre hijos   |

## 📏 Sizing

| Clase          | Descripción             |
| -------------- | ----------------------- |
| `w-1/2`        | Ancho 50%               |
| `h-64`         | Altura fija (ej. 16rem) |
| `min-w-full`   | Ancho mínimo completo   |
| `max-h-screen` | Altura máxima pantalla  |

## 🎨 Color

| Clase                  | Descripción      |
| ---------------------- | ---------------- |
| `bg-blue-500`          | Fondo azul       |
| `text-white`           | Texto blanco     |
| `border-red-300`       | Borde rojo       |
| `placeholder-gray-400` | Placeholder gris |

## 🔤 Tipografía

| Clase                | Descripción            |
| -------------------- | ---------------------- |
| `text-sm` `text-2xl` | Tamaño de texto        |
| `font-bold`          | Negrita                |
| `italic`             | Cursiva                |
| `tracking-wide`      | Espaciado entre letras |
| `leading-tight`      | Altura de línea        |
| `text-center`        | Alineación centrada    |

## 🧱 Borders & Radius

| Clase                  | Descripción        |
| ---------------------- | ------------------ |
| `border` `border-2`    | Ancho de borde     |
| `border-gray-300`      | Color del borde    |
| `rounded` `rounded-lg` | Bordes redondeados |
| `divide-x` `divide-y`  | Líneas divisorias  |

## 🧊 Efectos visuales

| Clase                | Descripción            |
| -------------------- | ---------------------- |
| `shadow` `shadow-lg` | Sombra del elemento    |
| `opacity-50`         | Opacidad               |
| `blur-sm`            | Desenfoque (blur)      |
| `transition`         | Transición CSS         |
| `duration-300`       | Duración de transición |
| `hover:bg-gray-100`  | Hover/focus state      |

## 🖱️ Interacción

| Clase                 | Descripción                   |
| --------------------- | ----------------------------- |
| `cursor-pointer`      | Cambia el cursor a "mano"     |
| `select-none`         | No se puede seleccionar texto |
| `pointer-events-none` | Desactiva interacción         |

## 🧑‍💻 Responsive

| Sufijos | Dispositivos |
| ------- | ------------ |
| `sm:`   | >= 640px     |
| `md:`   | >= 768px     |
| `lg:`   | >= 1024px    |
| `xl:`   | >= 1280px    |
| `2xl:`  | >= 1536px    |
