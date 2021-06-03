// create a board
//create items with classes of bombs and numbers
//check how many bombs around each item
//if there is no bomb all the items around free
document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid')
    let width = 10
    let squares = []
    let bombAmount = 20;
    let flags = 0
    let isGameOver = false
    // document.getElementById('restart').addEventListener('click',()=>{
    //     grid.innerHTML = ''
    //     isGameOver = false
    //     createBoard()
    // })

    //Create board
    function createBoard(){
        //get shuffeled game array with random bombs
        //fill with 'bomb' 20 positions from 0
        const bombsArray = Array(bombAmount).fill('bomb')
        const emptyArray = Array(width*width - bombAmount).fill('valid')
        const gameArray = emptyArray.concat(bombsArray)
        const shuffeledArray = gameArray.sort(() => Math.random() -0.5)
        // console.log(bombsArray);
        // console.log(emptyArray)
        // console.log(shuffeledArray);
        console.log(width)

        for(let i =0; i < width *width;i++){
            const square = document.createElement('div')
            square.setAttribute('id',i)
            grid.appendChild(square)
            square.classList.add(shuffeledArray[i])
            squares.push(square)
            square.addEventListener('click',function(e){
                click(square)
            })
            square.oncontextmenu = function(e){
                e.preventDefault()
                addFlags(square)
            }
        }


        for (let i = 0; i < squares.length; i++){
            let total = 0;
            const isLeftEdge = (i% width === 0)
            const isRightEdge = (i % width ===width -1)

            if(squares[i].classList.contains('valid')){

                if(i > 0 && !isLeftEdge && squares[i-1].classList.contains('bomb')){
                    total++
                }
                if(i > 9 && !isRightEdge && squares[i+1 -width].classList.contains('bomb')){
                    total++
                }
                //if is leftEdge is true its means that its 10 or 20 or 30 and then it doesnt have left corner above it
                if(i>10 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')){
                    total++
                }
                if(i>9 && squares[i - width].classList.contains('bomb')){
                    total++
                }
                if(i < 99 && !isRightEdge && squares[i+1].classList.contains('bomb')){
                    total++
                }
                if(i<90 && squares[i + width].classList.contains('bomb')){
                    total ++
                }
                if(i<90 && !isLeftEdge && squares[i-1+width].classList.contains('bomb')){
                    total ++
                }
                if(i<89 && !isRightEdge && squares[i +1+width].classList.contains('bomb')){
                    total ++
                }


                squares[i].setAttribute('data', total)
                console.log(squares[i])
            }
        }
    
    }
  

    createBoard()
    function addFlags(square){
        if(isGameOver){
            return
        }
        if(!square.classList.contains('checked') && (flags < bombAmount)){
            if(!square.classList.contains('flag')){
                square.classList.add('flag')
                square.innerHTML = "🚩";
                flags++
                checkWin()
            }else{
                square.classList.remove('flag')
                square.innerHTML = ''
                flags --
            }
        }
    }


    function click(square){
        let currentId = square.id

        if(isGameOver)return
        if(square.classList.contains('checked') || square.classList.contains('flag'))return
        if(square.classList.contains('bomb')){
            gameOver(square)
            console.log('game over')
            return
        }else{
            let total = square.getAttribute('data')
            if(total != 0){
                square.classList.add('checked')
                square.innerHTML = total
                console.log(square)
                if(total == 1){
                    square.classList.add("one")
                } else if(total == 2){
                    square.classList.add("two")
                }else if(total == 3){
                    square.classList.add("three")
                }else if(total == 4){
                    square.classList.add("four")
                }
                return
            }
            //if the total greater than 0 its go to if total !=0 and add checked to class and then the return moves him out from the function so its dont even go to checkSquare function
            checkSquare(square,currentId)
            
            // checkSquare(square,currentId)

        }
        square.classList.add('checked')
        console.log(square)


    }

    function checkSquare(square,currentId){
        const isLeftEdge = (currentId % width === 0)
        const isRightEdge = (currentId % width ===width -1)

        setTimeout(()=> {
            if (currentId > 0 && !isLeftEdge){
                const newId = squares[parseInt(currentId) -1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if(currentId < 99 && !isRightEdge){
                const newId = squares[parseInt(currentId) +1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)

            }
            if(currentId > 9 ){
                const newId = squares[parseInt(currentId) -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)

                
            }
            if(currentId < 90 ){
                const newId = squares[parseInt(currentId) +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)

            }if(currentId < 90 && !isLeftEdge ){
                const newId = squares[parseInt(currentId) -1 +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)

            }
            if(currentId < 89 && !isRightEdge ){
                const newId = squares[parseInt(currentId) +1 +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)

            }
            if(currentId > 10 && !isLeftEdge ){
                const newId = squares[parseInt(currentId) -1 -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)

            }
            if(currentId > 10 && !isRightEdge){
                const newId = squares[parseInt(currentId) +1 -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)

            }


        }, 100)
    }

    function gameOver(square) {
        isGameOver = true
        squares.forEach(square =>{
            if(square.classList.contains('bomb')){
                square.innerHTML = "💣";
            }
        })
    }

    function checkWin(){
        let matches = 0

        for(let i = 0; i<squares.length; i++){
            if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')){
                matches ++
            }
            if(matches === bombAmount){
                console.log("win")
                isGameOver = true
            }
        }
    }
    
})