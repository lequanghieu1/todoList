# Simple To-Do list on Vue3 with Vuex(styling by Bootstrap)


Responsive Vue3 +Vuex + Bootstrap project deployed on GitHub Pages.
Data storage realized via local storage. 
State menegment is implemented by two Vuex modules( dialog and todo).
Simple validation is implemented for dialog form. Currently it checks that input fields should not be empty. But I used custom validator that can be simply modified to add more validation cases.
Just by rewriting actions Vuex storage you may simple connect application with real rest API backend.

Deployed link:
https://ievhenbuival.github.io/todo-list/

## Description 

This is SPA in which you may add,remove and edit tasks.
Task has on of the states: "New","In progress","Done","Paused","Canceled".
In addition you may sort tasks by status, date and task name.

### Add new todo task
To add new task click "Add todo" button, then fill "Todo" and "State" fields and click "Confirm" button.
"Confirm" button becomes enabled when all fields are populated with data.

### Remove todo task
To remove task select task from list by clicking it and click "Remove todo" button.
Then confirm deleting in dialog.

### Edit todo task
To edit task select the task from list by clicking it and click "Edit todo". Then change data fields as you need and click "Confirm" button.
"Confirm" button becomes enabled when all fields are populated with data.


## Project setup
You shoud have Vue CLI installed to use all npm scripts.

```
npm install

```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```


### Lints and fixes files

```
npm run lint
```

