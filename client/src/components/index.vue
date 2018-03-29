<template lang="pug">
    div.todolist
        div.addItem.flex
            input(type='text' v-model:value="itemName" placeholder='What will you do today?')
            button.add-action(@click.prevent="addItem") +

        div.itemList
            ul
                li(v-for='item in this.items', :data-id="item._id")
                    div.flex
                        input.todo-finished(type='checkbox', :data-id="item._id", :checked="item.finished", @click="updateItem")
                        input.todo-text(v-model='item.name', @input="updateText")
                        button.del-action(@click.prevent="delItem") -
</template>

<script>
import _ from 'lodash'
import api from '../api/api.js'
import notification from '../lib/notificationDrawer/notificationDrawer.js'

var notifs = new notification('topright', 'notifdrawer')

export default {
    data: ()=>({
        items: [],
        itemName: ''
    }),
    methods: {
        getId(element) { return element.parentElement.parentElement.getAttribute('data-id') },
        getItems() {
            api.get('/todolist/get').then(dbitems=>{
                this.items = dbitems.data;
            });
        },
        addItem() {
            let p = this;

            api.post('/todolist/add', {
                itemName: this.itemName
            }).then(data=>{
                notifs.sendNotification(
                    'success',
                    {
                        title: 'Item Ajouté!',
                        body: 'Item Ajouté avec succés!'
                    }, 2000
                );

                p.itemName = '';
                p.getItems();
            });
        },
        delItem(e) {
            let p = this;

            api.post('/todolist/delete', {
                itemId: this.getId(e.target)
            }).then(data=>{
                notifs.sendNotification(
                    'info',
                    {
                        title: 'Item Supprimé!',
                        body: 'Item Supprimé avec succés!'
                    }, 2000
                );
                p.getItems();
            });
        },
        updateItem(e) {
            var changed_id = this.getId(e.target)
            var changed_item = this.items.filter(item => item._id === changed_id)

            changed_item[0].finished = e.target.checked

            api.post('/todolist/update', {
                itemId: changed_id,
                newItem: changed_item[0]
            })
        },
        updateText: _.debounce(function(e) {
            this.updateItem(e)
        }, 350)
    },
    //Lifehooks
    created() { this.getItems() }
}
</script>

<style lang="scss">
$item-height: 40px;

.todolist {
    width: 60%;
    max-width: 500px;
    margin: 0 auto;
    background-color: #f0f0f0;
    border-top: 3px solid #2c3e50;
}

.flex {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
}

.addItem {
    height: 50px;
    padding: 10px 0;

    input {
        height: inherit;
        padding: 0 0 0 15px;
        border: none;
        background-color: transparent;
        font-size: 30px;
        color: #2c3e50;
        flex: 1;
    }

    .add-action {
        height: 70px;
        padding: 0 15px;
        border: none;
        font-size: 20px;
        background-color: rgb(65, 184, 131);
        color: rgb(53, 73, 94);
        font-weight: bold;
        cursor: pointer;
    }
}

.itemList {
    min-height: 100px;
    box-shadow: rgba(0,0,0,0.1) 2px 3px 3px;
    color: #2c3e50;

    li {
        height: $item-height;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;

        div {
            flex: 1;
        }

        .todo-text {
            flex: 1;
            height: $item-height;
            padding: 0 0 0 15px;
            border: none;
            background-color: transparent;
            font-size: 20px;
            color: #2c3e50;
        }

        .todo-finished {
            position: relative;
            height: 30px;
            width: 30px;

            &::before {
                content: '';
                position: absolute;
                top: 0; left: 0;
                width: 24px; height: 24px;
                background-color: rgba(65, 184, 131, 0.5);
                border: 3px solid rgba(53, 73, 94, 0.75);
            }
            &:hover::before {
                border: 3px solid rgba(53, 73, 94, 1);
                cursor: pointer;
            }
            &:active::before {
                background-color: rgba(53, 73, 94, 0.75);
                border-color: rgba(65, 184, 131, 0.5);
            }
        }

        .del-action {
            height: 40px;
            padding: 0 15px;
            border: none;
            font-size: 20px;
            background-color: rgb(65, 184, 131);
            color: rgb(53, 73, 94);
            cursor: pointer;
        }
    }
}
.todo-finished:checked + .todo-text {
    text-decoration: line-through;
}
</style>
