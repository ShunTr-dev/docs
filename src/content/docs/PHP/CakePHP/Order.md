---
title: Order
---


# Orden en CakePHP

A continuación se presenta el código para gestionar el orden en CakePHP:

```php
if ($this->request->query['sort'] != null && $this->request->query['direction'] != null) {
    $sort = $this->request->query['sort'];
    $direction = $this->request->query['direction'];
} else {
    $sort = 'ResearchGroups_name_translation.content';
    $direction = 'ASC';
}
```

Es importante tener en cuenta que si se desea ordenar por otros campos además del pasado explícitamente en un objeto de consulta, se deberá combinar ambos métodos:

```php
$this->paginate['sortWhitelist'] = $this->Users->schema()->columns() + ['Cities.id', 'Cities.name'];
$query = $this->Users->find()
                     ->contain('Cities')
                     ->order(['Cities.name' => 'DESC']);
$users = $this->paginate($query);
```

En el siguiente fragmento, se muestra cómo manejar el orden en CakePHP:

```php
if (isset($this->request->query['sort']) && isset($this->request->query['direction'])) {
    $sort = $this->request->query['sort'];
    $direction = $this->request->query['direction'];
} else {
    $sort = 'ResearchGroups_name_translation.content';
    $direction = 'ASC';
}
if (empty($type)) {
    $type = 'active';
    $researchGroups = $this->paginate(
        $this->ResearchGroups->find('all', [
            'order' => [$sort => $direction],
            'conditions' => [
                'OR' => [
                    'end_date >' => date('Y-m-d'),
                    'end_date is null',
                ]
            ]
        ])
    );
} else {
    $type = 'all';
    $researchGroups = $this->paginate(
        $this->ResearchGroups->find('all', [
            'order' => [$sort => $direction]
        ])
    );
}
```
