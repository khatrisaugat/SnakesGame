window.addEventListener('load',()=>{
    //state for keeping all the data
    let st={
        rows:15,
        column:17,
        SnakeBodyDetails:[],
        initialSnakeLength:3,
        applePos:0,
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
        getMapStep:(step)=> document.querySelector('.step'+step)
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
        for (let i = 1; i <=st.initialSnakeLength ; i++) {
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
        apple.classList.add('apple');
        console.log(apple);
        const pos=Math.round(Math.random()*(st.rows*st.column));
        if(st.SnakeBodyDetails.includes(pos)){
            createApple();
        }else{
            st.applePos=pos;
        } 
        console.log(st.applePos);
        ViewData.getMapStep(pos).appendChild(apple);
    }
    createApple();





});