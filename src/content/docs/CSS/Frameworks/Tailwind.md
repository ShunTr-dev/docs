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
