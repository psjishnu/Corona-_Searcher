function fun1(){
    var name1=document.getElementById("id1").value;
    var rd1 = document.getElementById("case1");
    var rd2 =document.getElementById("case2");
    var rd3 = document.getElementById("case3");
    
    if(rd1.checked==true){
        name2=rd1.value;
    }
    else if(rd2.checked==true){
        name2=rd2.value;
    }
    else if(rd3.checked==true){
        name2=rd3.value;
    }
    console.log(name2);
    window.location.href='\\name?firstname='+name1+'&lastname='+name2;

}
