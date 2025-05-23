---
title: URL
---


## URL en CakePHP

### Construir URL

```php
<?= $this->Url->build(['action' => 'add']) ?>
```

### Referencia a la página anterior

```php
$this->redirect($this->referer());
```

### Referencia a una acción del request

```php
$this->request->getParam('prefix');
$this->request->getParam('controller');
$this->request->getParam('action');
```

### Recoger elementos de URL por GET

```php
$this->request->query('apartment');
```

### Cambiar vista

```php
$this->viewBuilder()->setLayout('ajax');
$this->viewBuilder()->template('index');
```

### Leer sesión

```php
$this->request->session()->read('User.group');
```

### Obtener elementos del POST

```php
$this->request->getData('code');
```

### Traducciones

```php
<?= $this->Translate->input('name', 'name_translations', $this, $serverLanguages, array('label'=> 'Name', 'type'=>'text')) ?>
```

Este documento proporciona ejemplos de uso de URL en CakePHP, incluyendo la construcción de URL, redireccionamiento a la página anterior, referencia a una acción del request, recogida de elementos de la URL por GET, cambio de vista, lectura de sesión, obtención de elementos del POST y traducciones.
