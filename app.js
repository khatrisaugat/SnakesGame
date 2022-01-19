window.addEventListener('load',()=>{
    //state for keeping all the data
    let st={
        rows:15,
        column:17,
        SnakeBodyDetails:[],
        initialSnakeLength:3,
        applePos:0,
        direction:'R'
    };
    
    //View Selection
    const ViewData={
        root:document.getElementById('root'),
        createDivElement:()=>document.createElement('div'),
        snakesMap:function(rows,columns){
            let box=[];
            for (let i = 0; i < rows*columns; i++) {             
                    let el=document.createElement('div');
                    el.classList.add(i%2===0?'box':'box1','step'+(i+1));
                    box.push(el);
            }
            return box;
        },
        GameMap:document.createElement('div'),
        getMapStep:(step)=> document.querySelector('.step'+step),
        getEl:(el)=>document.querySelector(el),
        getAllEl:(el)=>document.querySelectorAll(el)
    }

    //controller

    //creating a map for the game
    ViewData.root.appendChild(ViewData.GameMap);
    ViewData.GameMap.classList.add('GameMap');
    ViewData.GameMap.style.width=(st.column*2)+'rem';
    const mapView=ViewData.snakesMap(st.rows,st.column);
    mapView.map((el)=>{
        ViewData.GameMap.appendChild(el);
    });

    //Creating a Snake
    const createSnake=()=>{
        for (let i = st.initialSnakeLength; i >0 ; i--) {
            st.SnakeBodyDetails.push(((Math.round(st.rows/2)-1)*st.column)+i)
        }
        st.SnakeBodyDetails.map((el)=>{
            let bodyPart=ViewData.createDivElement();
            bodyPart.classList.add('snake');
            ViewData.getMapStep(el).appendChild(bodyPart);
        })
    };
    createSnake();
    console.log(st.SnakeBodyDetails);
    
    //creating apple
    const createApple=()=>{
        let apple=ViewData.createDivElement();
        //checking if there is an apple on the map before creating
        if(ViewData.getEl('body').contains(ViewData.getEl('.apple')))
            ViewData.getEl('.apple').parentNode.removeChild(ViewData.getEl('.apple'));
        apple.classList.add('apple');
        //creating and putting apple on the map
        const pos=Math.round(Math.random()*(st.rows*st.column));
        if(st.SnakeBodyDetails.includes(pos)){
            createApple();
        }else{
            st.applePos=pos;
        } 
        ViewData.getMapStep(pos).appendChild(apple);
    }
    createApple();

    //append snake to new map positions according to change in head position
    const appendSnake=(head)=>{
        for (let i = st.SnakeBodyDetails.length-1; i >0 ; i--) {
            st.SnakeBodyDetails[i]=st.SnakeBodyDetails[i-1];
        }
        st.SnakeBodyDetails[0]=head;

        ViewData.getAllEl('.snake').forEach((el,i)=>{
            ViewData.getMapStep(st.SnakeBodyDetails[i]).appendChild(el); 
        })
        console.log(st.SnakeBodyDetails);
    }

    //Move Snake
    const moveSnake=()=>setInterval(()=>{
        EdgeCheck();
        if(st.direction==='R'){
            appendSnake(st.SnakeBodyDetails[0]+1);

        }else if(st.direction==='L'){
            appendSnake(st.SnakeBodyDetails[0]-1);

        }else if(st.direction==='U'){
            appendSnake(st.SnakeBodyDetails[0]-17);

        }else if(st.direction==='D'){
            appendSnake(st.SnakeBodyDetails[0]+17);

        }
    },250);
    moveSnake();

    //Edge touch check
    const EdgeCheck=()=>{
        if(st.SnakeBodyDetails[0]<17){
            alert('Game Over');
        }else if(st.SnakeBodyDetails[0]%st.column===0){
            alert('Game Over');
        }else if((st.SnakeBodyDetails[0]-1)%st.column===0){
            alert('Game Over');
        }else if(st.SnakeBodyDetails[0]>st.column*st.rows){
            alert('Game Over');
        }
    }

    //Listen for user events
    ViewData.getEl('body').addEventListener('keyup',(e)=>{
        console.log(e.key);
        if(e.key==='ArrowUp' && st.direction!=='D'){
            st.direction='U';
        }else if(e.key==='ArrowRight' && st.direction!=='L'){
            st.direction='R';
        }else if(e.key==='ArrowDown' && st.direction!=='U'){
            st.direction='D';
        }else if(e.key==='ArrowLeft' && st.direction!=='R'){
            st.direction='L';
        }
    })





});