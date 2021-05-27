<template>
  <Page class="page">
    <ActionBar title="My Tasks" class="action-bar" />

    <TabView
      height="100%"
      android-tabs-position="bottom"
      selected-tab-text-color="#53ba82"
      tab-text-font-size="15"
    >
      <TabViewItem title="To Do" text-transform="uppercase">
        
        <StackLayout
          orientation="vertical"
          width="100%"
          height="100%"
        >
          <GridLayout
            columns="2*,*"
            rows="*"
            width="100%"
            height="25%"
          >
            <TextField
              v-model="textFieldValue"
              col="0"
              row="0"
              hint="Type new task..."
              editable="true"
              @returnPress="onButtonTap"
            />
            
            <Button
              col="1"
              row="0"
              text="Add task"
              @tap="onButtonTap"
            />
          </GridLayout>

          <ListView
            class="list-group"
            for="todo in todos"
            style="height:75%"
            separator-color="transparent"
            @itemTap="onItemTap"
          >
            <v-template>
              <Label
                id="active-task"
                :text="todo.name"
                class="list-group-item-heading"
                text-wrap="true"
              />
            </v-template>
          </ListView>
        </StackLayout>
      </TabViewItem>

      <TabViewItem title="Completed" text-transform="uppercase">
        <ListView
          class="list-group"
          for="done in dones"
          style="height:75%"
          separator-color="transparent"
          @itemTap="onDoneTap"
        >
          <v-template>
            <Label
              id="completed-task"
              :text="done.name"
              class="list-group-item-heading"
              text-wrap="true"
            />
          </v-template>
        </ListView>
      </TabViewItem>
    </TabView>
  </Page>
</template>


<script>

import * as ApplicationSettings from '@nativescript/core/application-settings';

export default {
  data() {
    return {
        dones: [],
        todos: [],
        textFieldValue: '',
    };
  },
    mounted(){
    if(ApplicationSettings.getString('todos')){
        this.todos=Object.values(JSON.parse(ApplicationSettings.getString('todos')));
    }
  },
  methods: {
    onItemTap(args) {
      console.log(`Item with index: ${args.index} tapped`);
      action('Что делаем?', 'Отмена', [
        'Сделано!',
        'Удалить',
      ]).then(result => {
        console.log(result); 
        switch (result) {
          case 'Сделано!':
            this.dones.unshift(args.item); 
            this.todos.splice(args.index, 1); 
            this.save();
            break;
          case 'Удалить':
            this.todos.splice(args.index, 1); 
            this.save();
            break;
          case 'Отмена' || undefined: 
            break;
        }
      });
    },
    save(){
        let toSave = Object.assign({}, this.todos);
        ApplicationSettings.setString('todos', JSON.stringify(toSave));
    },
    onDoneTap: function(args) {
      action('Удаляем? :D', 'Отмена', [        
        'Нет',
      ]).then(result => {
        console.log(result); 
        switch (result) {
          case 'Удалить':
            this.dones.splice(args.index, 1);
            this.save();
            break;

          case 'Нет' || undefined: 
          break;
        }
      });
    },
    onButtonTap() {
      
      if (!this.textFieldValue) {
        return;
      }
      console.log(`New task added: ${this.textFieldValue}.`);     
      this.todos.unshift({
        name: this.textFieldValue,
      });     
      this.textFieldValue = '';
      this.save();
    },
  },
};
</script>

<style scoped>
TextField {
  font-size: 20;
  color: #53ba82;
  margin-top: 10;
  margin-bottom: 10;
  margin-right: 5;
  margin-left: 20;
  height: 60;
}
button {
  font-size: 12;
  font-weight: bold;
  color: white;
  background-color: #53ba82;
  height: 40;
  margin-top: 10;
  margin-bottom: 10;
  margin-right: 10;
  margin-left: 10;
  border-radius: 20px;
}
#active-task {
  font-size: 20;
  font-weight: bold;
  color: #53ba82;
  margin-left: 20;
  padding-top: 5;
  padding-bottom: 10;
}
#completed-task {
  font-size: 20;
  color: #d3d3d3;
  margin-left: 20;
  padding-top: 5;
  padding-bottom: 10;
  text-decoration: line-through;
}
</style>
