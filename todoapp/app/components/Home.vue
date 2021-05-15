<template>
  <Page  class="app">
    <ActionBar title="Мои задачи" class="action-bar"/>

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
        <TextField v-model="newText" hint="Введите задачу..."/>
        <button class="Add"
          col="1"
          row="0"
          text="Добавить"
          @tap= "newTask()"
        />
      </GridLayout>
        <ListView  class="task" for="task in tasks" style="height:100%">
          <v-template>
            <GridLayout columns="200, 70, 70">
            <label  class="task done" v-if="task.done" textWrap="true" col="0">{{task.title}}</label>
            <label  class="task" v-else  @tap="edit(task.id, task.title)" col="0">{{task.title}}</label>
            <Button  class="button" text="✔" @tap="taskDone(task.id)" col="1"/>
            <Button  class="button" text="✘" @tap="remove(task.id)" col="2"/> 
            </GridLayout>
          </v-template>
        </ListView>
    </StackLayout>
  </Page>
</template>

<script>

import * as ApplicationSettings from '@nativescript/core/application-settings';


export default {
  data () {
    return {
      newText: '',
      tasks: []
    }
  },
  mounted(){
    if(ApplicationSettings.getString('tasks')){
      this.tasks=Object.values(JSON.parse(ApplicationSettings.getString('tasks')));
    }
  },
  methods: {
    newTask () {
      if(this.newText != ''){
        this.tasks.push({
          id: Math.random(),
          title: this.newText,
          done: false
        });
        this.newText = '';
      }
      this.save();
    },
    taskDone (id) {
      this.tasks = this.tasks.map(task => {
        if (task.id == id) task.done = !task.done;
        return task;
      })
      
      this.save();
    },
    remove (id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.save();
    },
    save(){
      let toSave = Object.assign({}, this.tasks);
      ApplicationSettings.setString('tasks', JSON.stringify(toSave));
    },
    
    edit(id, old_text) {
      prompt({
        title: "Изменить",
        message: "Введите изменения:",
        okButtonText: "OK",
        defaultText: old_text,
      })
      .then(result => {
         this.tasks.forEach(task => {
          if (task.id == id && result.text != ''){
            task.title = result.text;
            this.save();
          }    
         });
      })
    }
  }
}
</script>

<style>
.app{
    background-color: white;
}
.Add:active{
  color: yellowgreen;
  background-color:greenyellow;
  text-shadow: black 2px 3px 4px;
}
TextField {
  font-size: 18;
  color: black;
  margin-top: 10;
  margin-bottom: 10;
  margin-right: 5;
  margin-left: 20;
  height: 60;
}
button {
  font-size: 18;
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
.task{
  font-size: 18;
  margin: 30px 20px;
  color: black;
  text-align: center;
}
.done {
  text-decoration: line-through;
  color: #5f5f5f;
}
.button{
  background-color: #53ba82;
  border-radius: 10%;
  color: #ffffff;
  margin: 30px 10px;
}
.button:active {
  color: yellowgreen;
  background-color:greenyellow;
  text-shadow: black 2px 3px 4px;
}
</style>