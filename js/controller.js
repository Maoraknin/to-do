
function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()
    console.log(todos);
    if (todos.length) {
        const strHTMLs = todos.map(todo => `
         <li class="${(todo.isDone) ? "done" : ""}"
         onclick="onToggleTodo('${todo.id}')">
         ${todo.txt}
        <button onclick="onRemoveTodo(event,'${todo.id}')">x</button> 
         </li>` )
        document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    } else {

// CHECK IN CR - SERVICE AND CONTROL PLACE
// CHECK IN CR - SERVICE AND CONTROL PLACE
// CHECK IN CR - SERVICE AND CONTROL PLACE

        if (gFilterBy === 'all') document.querySelector('.todo-list').innerHTML = 'No more Todo'
        else if (gFilterBy === 'active') document.querySelector('.todo-list').innerHTML = 'No more Active Todo'
        else if (gFilterBy === 'done') document.querySelector('.todo-list').innerHTML = 'No more Done Todo'
    }

    document.querySelector('.total-todos').innerText = getTotalTodos()
    document.querySelector('.active-todos').innerText = getActiveTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="todo-txt"]')
    const elImp = document.querySelector('input[name="importance"]')
    const txt = elTxt.value
    if (txt === "") return
    var importance = elImp.value
    if (!importance) importance = '3'
    if (importance !== '1' || importance !== '2' || importance !== '3') return
        // console.log('importance:',importance)
        // console.log('txt', txt)
        addTodo(txt, importance)
        elTxt.value = ''
        elImp.value = ''
        renderTodos()

}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    // console.log('Removing', todoId)
    const isApproved = confirm('are you sure?')
    if (isApproved) {
        removeTodo(todoId)
        renderTodos()
    }

}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    // console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onSetSortOpt(SortBy) {
    setSort(SortBy)
    renderTodos()
}

