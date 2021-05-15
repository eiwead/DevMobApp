const app = new Vue({
  el: '#app',
  data: {
    title: 'Checklist',
    newTodo: '',
    todos: []
  },
  methods: {
    addTodo() {
      if(this.newTodo === '') { return };
      this.todos.push({
        title: this.newTodo,
        done: false
      });
      this.newTodo = '';
    },
    removeTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos.splice(todoIndex, 1);
    },
  }
});