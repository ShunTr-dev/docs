---
title: Cálculo de IVA
---


# Cálculo de IVA en PHP

Para calcular el valor de un producto sin el IVA en PHP, puedes utilizar la siguiente fórmula:

```php
$total_sin_el_iva = $total / (1 + $porcentaje / 100);
```

Esta fórmula te ayudará a obtener el precio original del producto antes de que se aplique el IVA, basándose en el precio total (`$total`) y el porcentaje de IVA aplicado (`$porcentaje`).
