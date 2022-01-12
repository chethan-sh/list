let tarr=[];
let count=0;
let del=0;
let flag;
let exist=false;

function onkeydownn()
{
    if(event.keyCode==13 && flag==0)
    {
        event.preventDefault();
        document.getElementById('add').click();
        return;
    }
    if(event.keyCode==13)
    {
        event.preventDefault();
        document.getElementById('add').click();
        return;
    }
}
function addItem() {
    let task=document.getElementById('text').value;
    if(!isNaN(task))
    {
        alert("Enter the valid credentials");
        return;
    }
    if((task==undefined || task==''))
    {
        alert("Enter the task first");
        return;
    }
    tarr.forEach((ele)=>{
        if(ele!=undefined)
        {
            if(ele['task']==task)
            {
                exist=true;
            }
        }
    })
    if(exist)
    {
        alert("Task already exist in list");
        exist=false;
        document.getElementById('text').value='';
    }
    else{
        tarr[count]={
            'index':count,
            'task':task,
           'priority':3,
           'complete':false,
               }
       createCard(task);
       alert("Task Added to List..")
       document.getElementById('text').value='';
       count++;
       document.getElementById('count').innerHTML=`total:${count-del}`;
    }
}
function createCard(task){
        tarr[count]['complete']=false;
        let card=document.createElement('div');
        card.id=count;
        card.addEventListener('click',divchange)
        card.className='card';
        let p1=document.createElement('p');
        p1.innerHTML=task;
        let edit=document.createElement('button');
        edit.style.backgroundImage="url('./edit.png')";
        edit.tooltip='edit task';
        edit.id='edit';
        let del=document.createElement('button');
        del.style.backgroundImage="url('./delete.png')";
        del.tooltip='delete task';
        del.id='del';
        let check=document.createElement('input');
        check.type='checkbox';
        card.appendChild(p1);
        card.appendChild(edit);
        card.appendChild(del);
        card.appendChild(check);
        document.getElementById('cds').appendChild(card);   
}
function divchange(){
    let a=event.target;
    let b=event.currentTarget;
    if(a.type=='checkbox')
    {
        if(a.checked)
        {
            if(confirm("Are you sure task completed"))
            {
                b.style.opacity='0.5';
                tarr[+b.id]['complete']=true;
            }
            else{
                a.checked=false;
            }
        }
        else{
            tarr[+b.id]['complete']=false;
            b.style.opacity='10';  
        }
    }
    if(a.id=='del')
    {
        if(confirm("Are you sure you want to delete"))
        {
            tarr[+b.id]=undefined;
            b.parentNode.removeChild(b);
            del=del+1;
            alert("Task deleted from the list");
         }
         return;
    }
    if(a.id=='edit')
    {
        flag=0;
        if(tarr[+b.id]['complete'])
        {
            alert("task already completed cant edit");
            flag=1;
            return;
        }
        let textbox=document.getElementById('text');
        let btn=document.getElementById('add');
        btn.innerHTML='Update';
        let div=document.getElementById(`${b.id}`);
        textbox.value=tarr[+b.id]['task'];
        btn.removeAttribute('onclick'); 
        let delfunc=function() {
            if(textbox.value=='' || (!isNaN(+textbox.value)))
            {
                alert("enter valid credentials");
                btn.removeEventListener('click',delfunc);
            }
            else
            {
                if(confirm("Are you sure you want to update"))
                {
                  
                    tarr.forEach((ele)=>{
                        if(ele!=undefined)
                        {
                            if((ele['task']==textbox.value))
                            {
                                exist=true;
                            }
                        }
                    })
                    if(exist)
                    {
                        alert("No update found in task");
                        btn.removeEventListener('click',delfunc);
                        exist=false;
                    }
                    else
                    {
                        tarr[+b.id]['task']=textbox.value;
                        let p=div.childNodes;
                        p[0].innerHTML=textbox.value;
                        alert("Task Updated Succesfully..")
                        btn.removeEventListener('click',delfunc);
                    }
                }
                else{
                    btn.removeEventListener('click',delfunc);
                }
            }
            textbox.value='';
            btn.innerHTML='ADD';
            flag=1;
            btn.setAttribute('onclick','addItem()');
           // return;
        };
        btn.addEventListener('click',delfunc);
    }
}
function completed() {
    if(flag==0)
    {
        alert("complete task first");
        return;
    }
    del=0;
    document.getElementById('cds').innerHTML='';
    let ttl=0;
    for(let i=0;i<tarr.length;i++)
    {
        if(tarr[i]!=undefined)
        {
            if(tarr[i]['complete'])
             {
                let card=document.createElement('div');
                card.id=tarr[i]['index'];
                card.addEventListener('click',divchange)
                card.className='card';
                let p1=document.createElement('p');
                p1.innerHTML=tarr[i]['task'];
                p1.style.marginRight='93px'
                let del=document.createElement('button');
                del.style.backgroundImage="url('./delete.png')";
                del.tooltip='delete task';
                del.id='del';
                let check=document.createElement('input');
                check.type='checkbox';
                check.checked=true;
                check.disabled=true;
                card.appendChild(p1);
                card.appendChild(del);
                card.appendChild(check);
                document.getElementById('cds').appendChild(card);
                ttl++;
             }
        }
    }
    document.getElementById('count').innerHTML=`completed:${ttl}`;
}
function pending() {
    if(flag==0)
    {
        alert("complete task first");
        return;
    }
    document.getElementById('cds').innerHTML='';
    let ttl=0;
    for(let i=0;i<tarr.length;i++)
    {
        if(tarr[i]!=undefined)
        {
            if(!(tarr[i]['complete']))
            {
            let card=document.createElement('div');
            card.id=tarr[i]['index'];
            card.addEventListener('click',divchange)
            card.className='card';
            let p1=document.createElement('p');
            p1.innerHTML=tarr[i]['task'];
            let del=document.createElement('button');
            del.style.backgroundImage="url('./delete.png')";
            del.tooltip='delete task';
            del.id='del';
            let edit=document.createElement('button');
            edit.style.backgroundImage="url('./edit.png')";
            edit.tooltip='edit task';
            edit.id='edit';
            let check=document.createElement('input');
            check.type='checkbox';
            card.appendChild(p1);
            card.appendChild(edit);
            card.appendChild(del);
            card.appendChild(check);
            document.getElementById('cds').appendChild(card);
            ttl++;
            }
        }
    }
    document.getElementById('count').innerHTML=`pending:${ttl}`;
} 
function add() {
    if(flag==0)
    {
        alert("complete task first");
        return;
    }
    document.getElementById('cds').innerHTML='';
    let ttl=0;
    for(let i=0;i<tarr.length;i++)
    {
        if(tarr[i]!=undefined)
        {
            let card=document.createElement('div');
            card.id=tarr[i]['index'];
            card.addEventListener('click',divchange)
            card.className='card';
            let p1=document.createElement('p');
            p1.innerHTML=tarr[i]['task'];
            let del=document.createElement('button');
            del.style.backgroundImage="url('./delete.png')";
            del.tooltip='delete task';
            del.id='del';
            let edit=document.createElement('button');
            edit.style.backgroundImage="url('./edit.png')";
            edit.tooltip='edit task';
            edit.id='edit';
            let check=document.createElement('input');
            check.type='checkbox';
            check.checked=tarr[i]['complete'];
            card.style.opacity=(check.checked)?'0.5':'10';
            card.appendChild(p1);
            card.appendChild(edit);
            card.appendChild(del);
            card.appendChild(check);
            document.getElementById('cds').appendChild(card);
            ttl=ttl+1;
        }
    }
    document.getElementById('count').innerHTML=`total:${ttl}`;
}
