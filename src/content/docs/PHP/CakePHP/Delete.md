---
title: Delete
---


# Método Delete

El método `delete` en CakePHP se utiliza para eliminar un registro de una tabla en la base de datos. Aquí tienes un ejemplo de cómo se implementa este método en un controlador de CakePHP:

```php
/**
 * Método Delete
 *
 * @param string|null $id ID de la categoría.
 * @return \Cake\Http\Response|null Redirige a la página de índice.
 * @throws \Cake\Datasource\Exception\RecordNotFoundException Cuando no se encuentra el registro.
 */
public function delete($id = null) {
    $this->request->allowMethod(['post', 'delete']);
    $category = $this->Categories->get($id);
    
    try {
        $this->Categories->delete($category);
        
        $this->Flash->success(__('La categoría ha sido eliminada.'));
        return $this->redirect(['action' => 'index']);
    } catch (\PDOException $e) {
        // El mensaje exacto de error es $e->getMessage();
        if($e->getCode() == '23503') {
            $this->Flash->error(__('El elemento que intenta eliminar está asociado con otros registros.'));
            return $this->redirect(['action' => 'index']);
        } else {
            $this->Flash->error(__('No se pudo eliminar la categoría. Por favor, inténtelo de nuevo.'));
            $this->Flash->error($e->getMessage());
        }
    }
}
```

Este método espera recibir el ID de la categoría que se va a eliminar como parámetro. Primero, se asegura de que la solicitud sea de tipo POST o DELETE. Luego, utiliza el método `get()` del modelo `Categories` para obtener el registro de la base de datos basado en el ID proporcionado.

Una vez que se ha obtenido el registro, se intenta eliminar utilizando el método `delete()` del modelo. Si la eliminación tiene éxito, se muestra un mensaje de éxito y se redirige al índice de categorías. Si ocurre un error durante la eliminación, se captura la excepción, se comprueba el código de error y se muestra un mensaje de error correspondiente.
