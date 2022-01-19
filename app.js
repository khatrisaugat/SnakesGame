window.addEventListener('load',()=>{
    //state for keeping all the data
    let st={
        rows:15,
        column:17
    };
    
    //View Selection
    const ViewData={
        root:document.getElementById('root'),
        snakesMap:function(rows,columns){
            let box=[];
            for (let i = 0; i < rows*columns; i++) {             
                    let el=document.createElement('div');
                    el.classList.add(i%2===0?'box':'box1','step'+(i+1));
                    box.push(el);
            }
            return box;
        },
        GameMap:document.createElement('div')
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
    





});