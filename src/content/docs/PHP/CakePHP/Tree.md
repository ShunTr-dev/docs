---
title: Tree
---


Model → table

```php
<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

class CategoriesTable extends Table {
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->addBehavior('Translate', [
            'fields' => ['name'],
            'translationTable' => 'I18n'
        ]);

        $this->setTable('categories');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');
        $this->addBehavior('Tree', [
            'recoverOrder' => ['name' => 'DESC'],
        ]);

        $this->belongsTo('ParentSections', [
            'className' => 'Categories',
            'foreignKey' => 'parent_id'
        ]);

        $this->hasMany('Parkings', [
            'foreignKey' => 'category_id'
        ]);
    }

    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        $validator
            ->scalar('name')
            ->maxLength('name', 255)
            ->requirePresence('name', 'create')
            ->notEmpty('name');

        $validator
            ->boolean('visible')
            ->requirePresence('visible', 'create')
            ->notEmpty('visible');

        return $validator;
    }

}

```
Model → Entity

```php
<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\ORM\Behavior\Translate\TranslateTrait;

class Category extends Entity {
    use TranslateTrait;
  
    protected $_accessible = [
        'name' => true,
        'visible' => true,
        'parent_id' => true,
        'lft' => true,
        'rght' => true,
        'created' => true,
        'modified' => true,
        '_translations' => true
    ];
}

```
Controller

```php
class CategoriesController extends AppController {

    public function index(){
        $categories = $this->Categories->find('all');;
        $this->set(compact('categories'));

        $descendants = $this->Categories->find('threaded', array(
            'order' => array('lft ASC') // or array('id ASC')
        ));

        $arrayCategories = $this->convertTreeToList($descendants, null);

        //$descendants = $this->Categories->find('children', ['for' => 60])->find('threaded');
        $this->set(compact('descendants'));
        $this->set(compact('arrayCategories'));
    }

    public function view($id = null){
        $category = $this->Categories->get($id);
        $this->set('category', $category);
    }

    public function add() {
        $langs = $this->getServerLanguages();
        $fieldsForm = $this->setFieldsToTranslate($langs, array('name'));
        $this->set('languageFields', $fieldsForm);
        
        $category = $this->Categories->newEntity();
        if ($this->request->is('post')) {
            $category = $this->Categories->patchEntity($category, $this->request->getData());
            $category->name = $this->request->getData('_translations.en.name');

            if ($this->Categories->save($category)) {
                $this->Flash->success(__('The category has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The category could not be saved. Please, try again.'));
        }

        $parentSections = $this->Categories->ParentSections->find('list');
        $this->set(compact('parentSections'));
        $this->set(compact('category'));
    }

    public function edit($id = null) {
        
        $langs = $this->getServerLanguages();
        $fieldsForm = $this->setFieldsToTranslate($langs, array('name'));
        $this->set('languageFields', $fieldsForm);

        $category = $this->Categories->find('translations')->where(['Categories.id' => $id])->toArray();
        $category = $category[0];

        if ($this->request->is(['patch', 'post', 'put'])) {
            $category = $this->Categories->patchEntity($category, $this->request->getData());

            if ($this->Categories->save($category)) {
                $this->Flash->success(__('The category has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The category could not be saved. Please, try again.'));
        }

        $parentSections = $this->Categories->ParentSections->find('list');
        $this->set(compact('parentSections'));
        $this->set(compact('category'));
    }

    public function delete($id = null){
        $this->request->allowMethod(['post', 'delete']);
        $category = $this->Categories->get($id);
        
        try {
            $this->Categories->delete($category);
            
            $this->Flash->success(__('The category has been deleted.'));
            return $this->redirect(['action' => 'index']);
        } catch (\PDOException $e) {
            // The exact error message is $e->getMessage();
            if($e->getCode() == '23503') {
                $this->Flash->error(__('The item you are trying to delete is associated with other records.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The category could not be deleted. Please, try again.'));
                $this->Flash->error($e->getMessage());
            }
        }
    }

    public function deleteAjax($id = null) {
        $this->autoRender = false;
        if ($this->request->is('ajax')) {
            $category = $this->Categories->get($this->request->data['id']);
            if ($this->Categories->delete($category)) {
                $complete['response'] = true;
                $this->response->type('json');
                $this->response->body(json_encode($complete));
                return $this->response;
            } 
        }
    }

    public function changeVisible(){
        $this->autoRender = false;

        if ($this->request->is('ajax')) {
            $category = $this->Categories->get($this->request->data['id']);
            if ($category) {
                $category->visible = $this->request->data['status'];
                if ($this->Categories->save($category)) {
                    $complete['response'] = "ok";
                    $this->response->type('json');
                    $this->response->body(json_encode($complete));
                    return $this->response;
                }
            }
        }
    }

    function convertTreeToList($categories, $pre_name = '|--> ') {
        $arrayCategories_tmp = array();

        foreach ($categories as $category) {
            $category->name = $pre_name . $category->name;

            $arrayCategories_tmp[] = $category;

            if (!empty($category->children)) {
                $pre_name_tmp = str_replace('> ', '', $pre_name) . '|--> ';
                $arrayCategories_tmp = array_merge($arrayCategories_tmp, $this->convertTreeToList($category->children, $pre_name_tmp) );
            } 
        }

        return $arrayCategories_tmp;
    }
}

```
Template → Index

```html
<?php
 use Cake\Routing\Router;
?>

<section id="widget-grid" class="">
    <div class="row">
        <article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="jarviswidget jarviswidget-color-darken" id="wid-id-1" data-widget-colorbutton="false" data-widget-editbutton="false" data-widget-custombutton="false" data-widget-deletebutton="false">
                <header>
                    <span class="widget-icon"> <i class="fa fa-table"></i> </span>
                    <h2><?= __('Categories', 'admin') ?></h2>
                    
                    <div class="widget-toolbar">    
                        <span class="widget-icon"> 
                            <a href="<?= $this->Url->build(['action' => 'add']);?>" style="color: white;">   
                                <i class="fa fa-plus"></i>
                            </a>
                        </span>
                    </div>
                </header>
                <div>
                    <div class="jarviswidget-editbox"></div>
                    <div class="widget-body no-padding">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"><?= $this->Paginator->sort('name') ?></th>
                                        <th scope="col"><?= $this->Paginator->sort('visible') ?></th>
                                        <th scope="col" class="actions"><?= __('Actions', 'admin') ?></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($arrayCategories as $category): ?>
                                    <tr>
                                        <td><?= h($category->name) ?></td>
                                        <td>
                                            <?php 
                                            if($category->visible == 1):
                                                echo '<i class="fa fa-lg fa-fw fa-check" style="color:green" onclick="isVisible(this, ' . $category->id . ');return false;">';
                                            else:
                                                echo '<i class="fa fa-lg fa-fw fa-times" style="color:red" onclick="isVisible(this, ' . $category->id . ');return false;">';
                                            endif;
                                            ?>
                                        </td>
                                        <td class="actions">
                                            <?= $this->Html->link(
                                                $this->Html->tag('i', '', array('class' => 'fa fa-lg fa-fw fa-eye', 'title' => __('View', 'admin'))), 
                                                array('action' => 'view', $category->id), 
                                                array('escape' => false)
                                            ) ?>

                                            <?= $this->Html->link(
                                                $this->Html->tag('i', '', array('class' => 'fa fa-lg fa-fw fa-edit', 'title' => __('Edit', 'admin'))),
                                                 array('action' => 'edit', $category->id),
                                                 array('escape' => false)
                                            ) ?>

                                            <a id="deleteButton" onclick="deleteAjax(this, <?= $category->id ?>)"><i class="fa fa-lg fa-fw fa-trash"></i></a>
                                        </td>
                                    </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</section>

<script type="text/javascript">
    function deleteAjax(e,id) {
        $.SmartMessageBox({
            title : "<?= __('Delete alert!', 'admin') ?>",
            content : "<?= __('Are you sure you want to delete this item?', 'admin') ?>",
            buttons : '[No][Yes]'
        }, function(ButtonPressed) {
            if (ButtonPressed === "Yes") {
                $.ajax({
                    url : '<?php echo Router::fullbaseUrl() . '/';?>admin/categories/deleteAjax',
                    data : { 
                        id : id
                    },
                    type : 'POST',
                    dataType : 'json',
                    success : function(data) {
                        $.smallBox({
                            title : "<?= __('Success', 'admin') ?>",
                            content : "<i class='fa fa-clock-o'></i> <i><?= __('Element removed correctly','admin') ?></i>",
                            color : "#659265",
                            iconSmall : "fa fa-check fa-2x fadeInRight animated",
                            timeout : 6000
                        });
                        $(e).parent().parent().remove();
                    },
                    error : function(xhr, status) {
                        $.smallBox({
                            title : "<?= __('Error', 'admin') ?>",
                            content : "<i class='fa fa-clock-o'></i> <i><?= __('Error to connect the database', 'admin') ?></i>",
                            color : "#C46A69",
                            iconSmall : "fa fa-times fa-2x fadeInRight animated",
                            timeout : 4000
                        });
                    }
                });
            }
            if (ButtonPressed === "No") {
                // "NO" Actions
            }
        });
    }


    function isVisible(e, idcategory) {
        if($(e).hasClass("fa-check")){
            visible = 0;
        } else {
            visible = 1;
        }

        $.ajax({
            url : '<?php echo Router::fullbaseUrl() . '/';?>categories/setVisible',
            data : { 
                id : idcategory,
                visible : visible
            },
            type : 'POST',
            dataType : 'json',
            success : function(data) { 
                if (visible == 1) {
                    $(e).attr('class', 'fa fa-lg fa-fw fa-check');
                    $(e).attr('style', 'color:green');
                } else {
                    $(e).attr('class', 'fa fa-lg fa-fw fa-times');
                    $(e).attr('style', 'color:red');
                }
            },
            error : function(xhr, status) {
                alert('Error to connect the database.');
            }
        });
    }
</script>

```
Template → Form

```html
<?php
$this->loadHelper('Form', [
    'templates' => 'app_form'
]);

?>

<section id="widget-grid" class="">
    <div class="row">
        <article class="col-sm-12 col-md-12 col-lg-12">
            <div class="jarviswidget jarviswidget-color-blueDark" id="wid-id-3" data-widget-colorbutton="false" data-widget-editbutton="false" data-widget-custombutton="false" data-widget-deletebutton="false">
                <header>
                    <span class="widget-icon"> <i class="fa fa-edit"></i> </span>
                    <h2><?= __('Category', 'admin') ?> </h2>
                </header>
                <div>
                    <div class="jarviswidget-editbox">
                    </div>
                    <div class="widget-body no-padding">
                        <?= $this->Form->create($category, array('class' =>'smart-form')) ?>
                        
                        
                        <ul id="myTab1" class="nav nav-tabs bordered">
                            <?php foreach($languageFields as $languageField): ?>
                                <li <?php if ($languageField === $languageFields[0]): ?>class="active" <?php endif; ?>>
                                    <a href="#<?= $languageField['locate'] ?>" data-toggle="tab" style="color: #2d2d2d !important"><?= $languageField['Lang_title'] ?></a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        <div id="myTabContent1" class="tab-content padding-10">
                            <?php foreach($languageFields as $languageField): ?>
                                <div <?php if ($languageField === $languageFields[0]): ?>class="tab-pane fade in active"<?php else:?>class="tab-pane fade"<?php endif; ?>  id="<?= $languageField['locate'] ?>">
                                    <fieldset>
                                        <section>
                                            <?= $this->Form->control($languageField['name'], ['placeholder' => __('Name','admin'), 'label' => false] ); ?>
                                        </section>
                                    </fieldset>
                                </div>
                            <?php endforeach; ?>
                        </div>
                        
                        <fieldset>
                            <section>
                                <?= $this->Form->control('parent_id', ['options' => $parentSections, 'empty' => 'No parent']); ?>
                            </section>
                            <section>
                                <?= $this->Form->control('visible', ['type' => 'checkbox', 'label' => false, 'required' => false]); ?>
                            </section>
                        </fieldset>
                        <footer>
                            <?= $this->Form->button(__('Submit','admin'), array('class' => 'btn btn-primary') ) ?>
                            <button type="button" class="btn btn-default" onclick="window.history.back();">
                                <?= __('Back','admin') ?>
                            </button>
                        </footer>
                        <?= $this->Form->end() ?>
                    </div>
                </div>
            </div>
        </article>
    </div>
</section>

```
Template → view

```html
<?php
use Cake\Routing\Router;
?>

<section id="widget-grid" class="">
    <div class="row">
        <article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="jarviswidget jarviswidget-color-darken" id="wid-id-1" data-widget-colorbutton="false" data-widget-editbutton="false" data-widget-custombutton="false" data-widget-deletebutton="false">
                <header>
                    <span class="widget-icon"> <i class="fa fa-table"></i> </span>
                    <h2><?= h($category->name) ?></h2>

                    <div class="widget-toolbar">
                        <span class="widget-icon">
                            <a href="<?= $this->Url->build(['action' => 'edit', $category->id]);?>" style="color: white;">   
                                <i class="fa fa-edit"></i>
                            </a>
                        </span>
                    </div>
                </header>
                <div>
                    <div class="jarviswidget-editbox"></div>
                    <div class="widget-body no-padding">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped">
                                <tr>
                                    <th scope="row"><?= __('Name', 'admin') ?></th>
                                    <td><?= h($category->name) ?></td>
                                </tr>
                                <tr>
                                    <th scope="row"><?= __('Created', 'admin') ?></th>
                                    <td><?= h($category->created) ?></td>
                                </tr>
                                <tr>
                                    <th scope="row"><?= __('Modified', 'admin') ?></th>
                                    <td><?= h($category->modified) ?></td>
                                </tr>
                                <tr>
                                    <th scope="row"><?= __('Visible', 'admin') ?></th>
                                    <td><?= $category->visible ? __('Yes', 'admin') : __('No', 'admin'); ?></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</section>
```
