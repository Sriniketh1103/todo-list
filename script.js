let tasks = []

function addtasks(){
  const task = document.querySelector('.task').value
  const datetime= document.querySelector('.datetime').value


 if( task!=`` && datetime!=`` ){
  const year = datetime.slice(0,4)
  const month = datetime.slice(5,7)
  const date = datetime.slice(8,10)
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

  tasks.push({
    task:task,
    date:date,
    month:month,
    year:year,
    time:time
  })

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
 


  
}

function renderhtml(){
    let taskdiv = document.querySelector('.tasks')
    let todolisthtml = ''
    for (let i=0;i<tasks.length;i++){
        todolisthtml +=`
      
     <div class="tasklist">
      <div class="content">
        <div class="datetimecont">
        <p class="at">at</p>
        <p class="tasktime">${ tasks[i].time}</p>
        <p class="on">on</p>
        <p class="taskdate">${tasks[i].date}/${tasks[i].month}/${tasks[i].year}</p>
        </div>
        <div class="namecont">
        <p class="taskname">${tasks[i].task}</p>
        </div>
      </div>
      <div class="delbtndiv">
         <button class="delbtn" onclick="
        tasks.splice(${i},1)
        renderhtml()">delete</button>
      </div>
    </div>

        `
    }

    taskdiv.innerHTML = todolisthtml
    

}