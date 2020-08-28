$(document).ready(function(){
  $.getJSON("/api/todos")
	.then(addTodos)
});


$('#todoInput').keypress(function(event){
	if(event.which==13)
		createTodo();
	
});

$('.list').on('click','li',function(){
	updateTodo($(this));
	
});
	
$('.list').on('click','span',function(event){
	event.stopPropagation(); //to stop li to stop firing
	removeTodo($(this).parent());
});

function createTodo(){
	var userinput = $('#todoInput').val();
	$.post('/api/todos',{name: userinput})
	.then(function(newtodo){
		$('#todoInput').val('');
		addTodo(newtodo);
	})
	.catch(function(err){
		console.log(err);
	})
}
	
function addTodo(todo){
	 var newtodo =$('<li class="task">'+todo.name+'<span>X</span></li>');
	     newtodo.data('id',todo._id);
	     newtodo.data('completed',todo.completed);
		if(todo.completed){
			newtodo.addClass("done");
		}
		$('.list').append(newtodo);
}

function addTodos(todos){
	todos.forEach(function(todo){
       addTodo(todo);	   
	});
}


function updateTodo(todo){
	var isDone = !todo.data('completed');
	var updateData = {completed: isDone};
	$.ajax({
		method: 'PUT',
		url: "/api/todos/"+todo.data("id"),
		data: updateData
	})
	.then(function(updatetodo){
		todo.toggleClass('done');
		todo.data('completed',isDone);
	})
	.catch(function(err){
		console.log(err);
	})
}
function removeTodo(todo){
	var id= todo.data('id');
	$.ajax({
		method: 'DELETE',
		url: '/api/todos/'+id
	})
	.then(function(data){
		todo.remove();
	})
	.catch(function(err){
		console.log(err);
	})
}

