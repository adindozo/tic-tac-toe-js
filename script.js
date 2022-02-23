window.onload=function(){
    
    
    let canvas = document.getElementById('canvas');
    let sirinaPolja=canvas.height/3;
    let trenutniigrac='x';
    let ctx=canvas.getContext('2d');
    function crtajPolje(){
    ctx.beginPath();
    ctx.moveTo(0,canvas.height/3);
    ctx.lineTo(canvas.height,canvas.height/3);
    ctx.moveTo(0,canvas.height/3*2);
    ctx.lineTo(canvas.height,canvas.height/3*2);
    ctx.moveTo(canvas.height/3,0);
    ctx.lineTo(canvas.height/3,canvas.height);
    ctx.moveTo(canvas.height/3*2,0);
    ctx.lineTo(canvas.height/3*2,canvas.height);
    ctx.stroke();
    }
    crtajPolje();
    function crtajO(x,y){
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.arc(x*sirinaPolja+sirinaPolja/2, y*sirinaPolja+sirinaPolja/2, 2/8*sirinaPolja, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.lineWidth = 1;

    }

    function crtajX(x,y){
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(x*sirinaPolja+1/4*sirinaPolja,y*sirinaPolja+1/4*sirinaPolja);
        ctx.lineTo(x*sirinaPolja+3/4*sirinaPolja,y*sirinaPolja+3/4*sirinaPolja);
        ctx.moveTo(x*sirinaPolja+sirinaPolja-1/4*sirinaPolja,y*sirinaPolja+1/4*sirinaPolja);
        ctx.lineTo(x*sirinaPolja+1/4*sirinaPolja,y*sirinaPolja+3/4*sirinaPolja);
        ctx.stroke();
        ctx.lineWidth = 1;
        
    }
    let iskoristenaPolja=[]
    function ProvjeraNIZUNIZU(prvi,udrugom){
        let i=0;
        let a = false
        while (i<udrugom.length){
            if (udrugom[i].toString()==prvi.toString()){
               
                a= true;
            }

            i++;
        }
        return a;

    }
    function CheckIfFirstArrayContainsSecondOne(FirstArray, SecondArray){
        
        
        let provjera=false
        
        
        for(let i=0;i<FirstArray.length;i++){
            if(FirstArray[i].toString()==SecondArray.toString()){
                provjera=true
                
            }




        }
        return provjera;
      
        console.log(provjera);
    }
    let koordinatePobjede={
        opcije:[
        [[0,0],[0,1],[0,2]],
        [[1,0],[1,1],[1,2]],
        [[2,0],[2,1],[2,2]],
        [[0,0],[1,0],[2,0]],
        [[0,1],[1,1],[2,1]],
        [[0,2],[1,2],[2,2]],
        [[0,0],[1,1],[2,2]],
        [[2,0],[1,1],[0,2]],
        ],
        x:[],
        o:[]
        
    }
    let dozvolaklikanja=true;
    function crtajYLiniju(x){
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(x*sirinaPolja+1/2*sirinaPolja,0);
        ctx.lineTo(x*sirinaPolja+1/2*sirinaPolja,canvas.height);
        
        ctx.stroke();
        ctx.strokeStyle = "black";
    }
    function crtajXLiniju(y){
        
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(0,y*sirinaPolja+1/2*sirinaPolja);
        ctx.lineTo(canvas.width,y*sirinaPolja+1/2*sirinaPolja);
        
        ctx.stroke();
        ctx.strokeStyle = "black";
    }

    function crtajDijagonalu(parametar)

    {   ctx.strokeStyle = "red";
        if (parametar==6){
        ctx.beginPath();
        
        ctx.moveTo(0,0);
        ctx.lineTo(canvas.width,canvas.width);
        
        ctx.stroke();
        }
        else if(parametar==7){
            ctx.beginPath();
            ctx.moveTo(0,canvas.width);
            ctx.lineTo(canvas.width,0);
        
            ctx.stroke();

        }
        ctx.strokeStyle = "black";
    }

  
    canvas.addEventListener('click',function(e){
        let rect = canvas.getBoundingClientRect();
        let x = Math.floor((e.clientX - rect.left)/(canvas.width/3));
        let y = Math.floor((e.clientY - rect.top)/(canvas.width/3));
        
        if (trenutniigrac=='x' && CheckIfFirstArrayContainsSecondOne(iskoristenaPolja,[x,y])==false&&dozvolaklikanja){
            crtajX(x,y);
            trenutniigrac='o';
            iskoristenaPolja.push([x,y]);
            koordinatePobjede.x.push([x,y]);
            let i=0;
            while(i<8 && dozvolaklikanja){
                if (
                    CheckIfFirstArrayContainsSecondOne(koordinatePobjede.x,koordinatePobjede.opcije[i][0])&&
                    CheckIfFirstArrayContainsSecondOne(koordinatePobjede.x,koordinatePobjede.opcije[i][1])&&
                    CheckIfFirstArrayContainsSecondOne(koordinatePobjede.x,koordinatePobjede.opcije[i][2])
                    
                    
                    ){
                        if (i==0 || i==1 || i==2){
                            crtajYLiniju(i);
                        }
                        if (i==3 || i==4 || i==5){
                            crtajXLiniju(i-3);
                        }
                        if (i==6 || i==7 ){
                            crtajDijagonalu(i);
                        }
                        dozvolaklikanja=false;
                    }
                
                i++;
            }
        }else if (CheckIfFirstArrayContainsSecondOne(iskoristenaPolja,[x,y])==false&&dozvolaklikanja) {
            crtajO(x,y);
            trenutniigrac='x';
            iskoristenaPolja.push([x,y]);
            koordinatePobjede.o.push([x,y]);
            let i=0;
            while(i<8 && dozvolaklikanja){
                if (
                    CheckIfFirstArrayContainsSecondOne(koordinatePobjede.o,koordinatePobjede.opcije[i][0])&&
                    CheckIfFirstArrayContainsSecondOne(koordinatePobjede.o,koordinatePobjede.opcije[i][1])&&
                    CheckIfFirstArrayContainsSecondOne(koordinatePobjede.o,koordinatePobjede.opcije[i][2])
                    
                    
                    ){  
                        if (i==0 || i==1 || i==2){
                            crtajYLiniju(i);
                        }
                        if (i==3 || i==4 || i==5){
                            crtajXLiniju(i);
                        }
                        if (i==6 || i==7 ){
                            crtajDijagonalu(i);
                        }
                        dozvolaklikanja=false;
                    }
                
                i++;
            }
        }

    })
    let reset=document.getElementById('reset');
    reset.addEventListener('click',function(){
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         crtajPolje();
         koordinatePobjede.x=[];
         koordinatePobjede.o=[];
         iskoristenaPolja=[];
         trenutniigrac='x';
         dozvolaklikanja=true;

    })
    


}