---
title: GREP
---


# Búsqueda con GREP

Para realizar una búsqueda recursiva y sin distinción entre mayúsculas y minúsculas de una palabra o conjunto de palabras en los archivos de un directorio, puedes utilizar el siguiente comando:

```bash
grep -r -i 'palabra o palabras' ./
```

Este comando buscará la cadena especificada (`'palabra o palabras'`) en todos los archivos del directorio actual (`./`), incluyendo subdirectorios de forma recursiva (`-r`) y sin distinguir entre mayúsculas y minúsculas (`-i`).
