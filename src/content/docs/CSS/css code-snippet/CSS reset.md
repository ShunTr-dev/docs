---
title: CSS reset
description: css reset 2024
---


```css

* {
    margin: 0;
    padding: 0;
}
*,
*::before,
*::after {
    box-sizing: border-box;
}

body {
    min-height: 100dvh;
}
input,
button,
textarea,
select {
    font: inherit;
}

p {
    text-wrap: pretty;
}
h1,
h2,
h3,
h4,
h5,
h6 {
    text-wrap: balance;
}

img,
video,
svg {
    max-width: 100%;
    height: auto;
}

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
        transition: none;
    }
}

```
