---
title: galeria
---


```html
<style type="text/css">
    body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
            'Helvetica Neue', sans-serif;
        margin: 0;
        background-color: black;
    }

    section {
        columns: 2;
        padding: 16px 32px;
        column-gap: 32px;
    }

    section img {
        border-radius: 4px;
        width: 100%;
        height: auto;
        margin-bottom: 32px;

        animation: reveal linear both; /* para que aparezcan las imágenes según van apareciendo */
        animation-timeline: view();
        animation-range: entry 20% cover 30%; /* para que empiece una vez entrada un 20% de la imagen, y el final el 30% del elemento */
    }

    h1 {
        text-align: center;
        color: white;
        padding: 16px;
        width: 100%;
        position: sticky;
        top: 0;

        animation: enhance-header linear both;
        animation-timeline: scroll(root block);
        animation-range: 0 200px; /* Le decimos hasta donde va a llegar la animación */
    }

    @keyframes reveal {
        from {
            opacity: 0;
            /* translate: 0 100px; */
            scale: 0.5;
        }

        to {
            opacity: 1;
            /* translate: 0 0; */
            scale: 1;
        }
    }

    @keyframes enhance-header {
        to {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(5px);
            font-size: 18px;
            color: black;
        }
    }
</style>

<h1>Galería sin JS</h1>

<section>
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
    <img src="..//src/assets/image-docs/this-is-a-test-wp.png" alt="This is a test" />
</section>
```
