let tasks = JSON.parse(localStorage.getItem('tasks')) || []

renderhtml()
function addtasks(){
  const task = document.querySelector('.task').value
  const datetime= document.querySelector('.datetime').value


 if( task!=`` && datetime!=`` ){
  const year = datetime.slice(0,4)
  const month = datetime.slice(5,7)
  const date = datetime.slice(8,10)
  const compdate = `${date}/${month}/${year}`
  let time = datetime.slice(11,16) + " AM"

  if(time.slice(0,2)>12){
   
   time = (time.slice(0,2)-12) + time.slice(2,5) + " PM"
  }
  else if(time.slice(0,2)==0){
    time = String(Number(time.slice(0,2))+12)+ time.slice(2,5) + " AM"
  }
  else if(time.slice(0,2)==12){
    time = datetime.slice(11,16) + " PM"
  }


  
    dateindex = tasks.findIndex(item => item === compdate)
    
    if(dateindex!=-1){
      tasks[dateindex + 1].push(
        {
          task:task,
          date:compdate,
          month:month,
          year:year,
          time:time
        }
      )
    }
    else{
      tasks.push(
        compdate,
        [{
        task:task,
        date:compdate,
        month:month,
        year:year,
        time:time
      }])
    }
 



 



  document.querySelector('.task').value=``
  document.querySelector('.datetime').value=``
  
  renderhtml()


 }

 else if(task===``){
    alert("please fill out the Task field")
 }
 else{
    alert("please select the date and time")
 }
 



addtoStorage()

  
}

function addtoStorage(){
  localStorage.setItem('tasks',JSON.stringify(tasks))
}

function renderhtml(){
    let taskdiv = document.querySelector('.tasks')
    let todolisthtml = ''
    
    if(tasks.length === 0){
      todolisthtml = `<div class="notasks">

      <p> Nothing To Do... </p>
      </div>


      `
    }
    for (let i=0;i<tasks.length;i+=2){
      todolisthtml += `
      <div class="taskdate">
      <p>${tasks[i]}</p>
      </div>
      `
      for (let j=0;j<tasks[i+1].length;j++){
        todolisthtml += `
        <div class="tasklist">
        <p class="taskname"> ${tasks[i+1][j].task} </p>
        <p class="tasktime"> ${tasks[i+1][j].time} </p>
       <button class="delbtn" onclick=" del(${i},${j})">Delete</button>
        </div>
        `
      }
    }

    taskdiv.innerHTML = todolisthtml
    

}

function del(i,j){
  tasks[i+1].splice(j,1)
  renderhtml()
 
   if(tasks[i+1].length === 0){
    tasks.splice(i+1,1)
    tasks.splice(i,1)
    renderhtml()
  }

  addtoStorage()
}