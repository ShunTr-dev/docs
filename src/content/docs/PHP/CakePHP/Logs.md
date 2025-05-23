---
title: Logs
---


# Logging en CakePHP

Para registrar información detallada sobre el flujo de ejecución de tu aplicación CakePHP, puedes utilizar la funcionalidad de logging. Aquí se presenta cómo configurar y utilizar el logging en CakePHP:

## Configuración del archivo de configuración `app.php`

En el archivo `config/app.php`, puedes definir diferentes configuraciones de logging para diferentes scopes. Por ejemplo, si deseas registrar información específica en un archivo separado, puedes configurarlo de la siguiente manera:

```php
'gateway' => [
  'className' => 'File',
  'path' => LOGS,
  'levels' => [], // Niveles de log, por defecto son todos.
  'scopes' => ['gateway'],
  'file' => 'gateway.log',
]
```

## Uso del logging en el controlador

Una vez configurado, puedes utilizar el logging en tu controlador de la siguiente manera:

```php
use Cake\Log\Log;

Log::debug('Las firmas no coinciden.', ['scope' => ['gateway']]);
Log::debug('mensaje prueba', ['scope' => ['gateway']]);
```

Aquí, `Log::debug()` se utiliza para registrar mensajes de debug en el archivo de log configurado para el scope `gateway`. Puedes usar diferentes niveles de logging según la gravedad de la información que desees registrar. Los niveles comunes incluyen `debug`, `warning`, `info`, `emergency`, `alert`, `critical`, y `notice`.

Al especificar el scope `gateway`, los mensajes se registrarán en el archivo `gateway.log` como se configuró anteriormente en el archivo `app.php`. Esto ayuda a mantener una estructura organizada en los registros, especialmente cuando tienes múltiples componentes o funcionalidades en tu aplicación que necesitan ser registrados por separado.
