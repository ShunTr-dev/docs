---
title: Effecto de cambio de modo claro-oscuro
---


[theme-toggle](https://theme-toggle.rdsx.dev/)

Theme toggle effect
ALL effects

```css
/* circle */

::view-transition-group(root) {
    animation-timing-function: var(--expo-out);
}
::view-transition-old(root),
.dark::view-transition-old(root) {
    animation: none;
    z-index: -1;
}
::view-transition-new(root) {
    mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="white"/></svg>')
        center / 0 no-repeat;
    animation: scale 1s;
}
@keyframes scale {
    to {
        mask-size: 200vmax;
    }
}

/* circle-with-blur */

::view-transition-group(root) {
    animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
    mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>')
        center / 0 no-repeat;
    animation: scale 1s;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
    animation: none;
    z-index: -1;
}
.dark::view-transition-new(root) {
    animation: scale 1s;
}
@keyframes scale {
    to {
        mask-size: 200vmax;
    }
}

/* circle-blur-top-left */

::view-transition-group(root) {
    animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
    mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="0" cy="0" r="18" fill="white" filter="url(%23blur)"/></svg>')
        top left / 0 no-repeat;
    mask-origin: content-box;
    animation: scale 1s;
    transform-origin: top left;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
    animation: scale 1s;
    transform-origin: top left;
    z-index: -1;
}
@keyframes scale {
    to {
        mask-size: 350vmax;
    }
}

/* polygon */

::view-transition-group(root) {
    animation-duration: 0.7s;
    animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
    animation-name: reveal-light;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
    animation: none;
    z-index: -1;
}
.dark::view-transition-new(root) {
    animation-name: reveal-dark;
}
@keyframes reveal-dark {
    from {
        clip-path: polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%);
    }
    to {
        clip-path: polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%);
    }
}
@keyframes reveal-light {
    from {
        clip-path: polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%);
    }
    to {
        clip-path: polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%);
    }
}

/* polygon-gradient */

::view-transition-group(root) {
    animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
    mask: url('assets/custom-svg.svg') top left / 0 no-repeat;
    mask-origin: top left;
    animation: scale 1.5s;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
    animation: scale 1.5s;
    z-index: -1;
    transform-origin: top left;
}
@keyframes scale {
    to {
        mask-size: 200vmax;
    }
}

/* gif-1 */

::view-transition-group(root) {
    animation-timing-function: var(--expo-in);
}
::view-transition-new(root) {
    mask: url('https://media.tenor.com/cyORI7kwShQAAAAi/shigure-ui-dance.gif') center / 0 no-repeat;
    animation: scale 3s;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
    animation: scale 3s;
}
@keyframes scale {
    0% {
        mask-size: 0;
    }
    10% {
        mask-size: 50vmax;
    }
    90% {
        mask-size: 50vmax;
    }
    100% {
        mask-size: 2000vmax;
    }
}

/* gif-2 */

::view-transition-group(root) {
    animation-timing-function: var(--expo-in);
}
::view-transition-new(root) {
    mask: url('https://media.tenor.com/Jz0aSpk9VIQAAAAi/i-love-you-love.gif') center / 0 no-repeat;
    animation: scale 2s;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
    animation: scale 2s;
}
@keyframes scale {
    0% {
        mask-size: 0;
    }
    10% {
        mask-size: 50vmax;
    }
    90% {
        mask-size: 50vmax;
    }
    100% {
        mask-size: 2000vmax;
    }
}

/* animation timing functions */
:root {
    --expo-in: linear(
        0 0%,
        0.0085 31.26%,
        0.0167 40.94%,
        0.0289 48.86%,
        0.0471 55.92%,
        0.0717 61.99%,
        0.1038 67.32%,
        0.1443 72.07%,
        0.1989 76.7%,
        0.2659 80.89%,
        0.3465 84.71%,
        0.4419 88.22%,
        0.554 91.48%,
        0.6835 94.51%,
        0.8316 97.34%,
        1 100%
    );
    --expo-out: linear(
        0 0%,
        0.1684 2.66%,
        0.3165 5.49%,
        0.446 8.52%,
        0.5581 11.78%,
        0.6535 15.29%,
        0.7341 19.11%,
        0.8011 23.3%,
        0.8557 27.93%,
        0.8962 32.68%,
        0.9283 38.01%,
        0.9529 44.08%,
        0.9711 51.14%,
        0.9833 59.06%,
        0.9915 68.74%,
        1 100%
    );
}
```

```js
if (!document.startViewTransition) switchTheme()
document.startViewTransition(switchTheme)
```

Here's some demos
Now you can write your css as you wish to

following is a simple example, that uses a circular mask

```css
::view-transition-new(root) {
    mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="white"/></svg>')
        center / 0 no-repeat;
    animation: scale 1s;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
    animation: none;
    z-index: -1;
}
.dark::view-transition-new(root) {
    animation: scale 1s;
}

@keyframes scale {
    to {
        mask-size: 200vmax;
    }
}
```

lets add a little blur to the svg

```css
::view-transition-group(root) {
    animation-timing-function: var(--expo-out);
}

::view-transition-new(root) {
    mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>')
        center / 0 no-repeat;
    animation: scale 1s;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
    animation: none;
    z-index: -1;
}
.dark::view-transition-new(root) {
    animation: scale 1s;
}

@keyframes scale {
    to {
        mask-size: 200vmax;
    }
}
```

let's try to pivot the center of the circle to top left

```css
::view-transition-group(root) {
    animation-timing-function: var(--expo-out);
}

::view-transition-new(root) {
    mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="0" cy="0" r="18" fill="white" filter="url(%23blur)"/></svg>')
        top left / 0 no-repeat;
    mask-origin: content-box;
    animation: scale 1s;
    transform-origin: top left;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
    animation: scale 1s;
    transform-origin: top left;
    z-index: -1;
}

@keyframes scale {
    to {
        mask-size: 350vmax;
    }
}
```

see this is simple, now the skylimit is your imagination

we've seen all the svg mask animations, but we can use clip-paths too

```css
::view-transition-group(root) {
    animation-duration: 0.7s;
    animation-timing-function: var(--expo-out);
}

::view-transition-new(root) {
    animation-name: reveal-light;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
    animation: none;
    z-index: -1;
}
.dark::view-transition-new(root) {
    animation-name: reveal-dark;
}

@keyframes reveal-dark {
    from {
        clip-path: polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%);
    }
    to {
        clip-path: polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%);
    }
}

@keyframes reveal-light {
    from {
        clip-path: polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%);
    }
    to {
        clip-path: polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%);
    }
}
```

the issue with using clip path is that you can't do much with it, like adding gradient or blur. so svg should be a good choice for most cases

lets see how can we improve the clip-path animation with a custom svg with linear gradient

we can use local assets too

```css
::view-transition-group(root) {
    animation-timing-function: var(--expo-out);
}

::view-transition-new(root) {
    mask: url('assets/custom-svg.svg') top left / 0 no-repeat;
    mask-origin: top left;
    animation: scale 1.5s;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
    animation: scale 1.5s;
    z-index: -1;
    transform-origin: top left;
}

@keyframes scale {
    to {
        mask-size: 200vmax;
    }
}
```

here's the cool part

you can use gifs too

```css
::view-transition-group(root) {
    animation-timing-function: var(--expo-in);
}

::view-transition-new(root) {
    mask: url('https://media.tenor.com/cyORI7kwShQAAAAi/shigure-ui-dance.gif') center / 0 no-repeat;
    animation: scale 3s;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
    animation: scale 3s;
}

@keyframes scale {
    0% {
        mask-size: 0;
    }
    10% {
        mask-size: 50vmax;
    }
    90% {
        mask-size: 50vmax;
    }
    100% {
        mask-size: 2000vmax;
    }
}
```

this one's good 😉

```css
::view-transition-group(root) {
    animation-timing-function: var(--expo-in);
}

::view-transition-new(root) {
    mask: url('https://media.tenor.com/Jz0aSpk9VIQAAAAi/i-love-you-love.gif') center / 0 no-repeat;
    animation: scale 1.5s;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
    animation: scale 1.5s;
}

@keyframes scale {
    0% {
        mask-size: 0;
    }
    10% {
        mask-size: 50vmax;
    }
    90% {
        mask-size: 50vmax;
    }
    100% {
        mask-size: 2000vmax;
    }
}
```

here are the two animation timing functions i'm using for the examples

```css
:root {
    --expo-in: linear(
        0 0%,
        0.0085 31.26%,
        0.0167 40.94%,
        0.0289 48.86%,
        0.0471 55.92%,
        0.0717 61.99%,
        0.1038 67.32%,
        0.1443 72.07%,
        0.1989 76.7%,
        0.2659 80.89%,
        0.3465 84.71%,
        0.4419 88.22%,
        0.554 91.48%,
        0.6835 94.51%,
        0.8316 97.34%,
        1 100%
    );
    --expo-out: linear(
        0 0%,
        0.1684 2.66%,
        0.3165 5.49%,
        0.446 8.52%,
        0.5581 11.78%,
        0.6535 15.29%,
        0.7341 19.11%,
        0.8011 23.3%,
        0.8557 27.93%,
        0.8962 32.68%,
        0.9283 38.01%,
        0.9529 44.08%,
        0.9711 51.14%,
        0.9833 59.06%,
        0.9915 68.74%,
        1 100%
    );
}
```

thats basically it. you have enough context to build cool theme transitions with view transitions api
