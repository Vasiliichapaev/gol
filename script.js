
var width = 20
var hight = 15
var old_cells = []
var start = true
timeout_id = 0
down = false


document.querySelector(".clear").addEventListener('click', cleaner)
document.querySelector(".start").addEventListener('click', start_gol)

tb = document.querySelector(".table")

document.onkeydown = function(){
    if (event.keyCode == 16){
        down=true; console.log(down)
    }
}

document.onkeyup = function(){
    if (event.keyCode == 16){
        down=false; console.log(down)
    }
}

for (i=0; i<hight; i++){
    var row = document.createElement('div')
    row.className = "row"
    tb.appendChild(row)
    old_cells.push([])
    for (k=0; k<width; k++){
        var cell = document.createElement('div')
        cell.classList.add("cell", "row" + i, "column" + k)
        row.appendChild(cell)
        cell.addEventListener('click', life2)
        cell.addEventListener('mouseover', life)
        old_cells[i].push(0)
    }
}

function life(event){
    if (down){
        this.classList.add("life")
    }
}

function life2(event){
        this.classList.add("life")
}


function cleaner(){
    start = true
    clearTimeout(timeout_id)
    for (i=0; i<hight; i++){
        for (k=0; k<width; k++){
            document.querySelector(".row"+i+".column"+k).classList.remove("life")
            old_cells[i][k] = 0
        }
    }
}

function start_gol() {

    var new_cells = new Array(hight)
    for (i=0; i<hight; i++){
        new_cells[i] = new Array(width)
        for (k=0; k<width; k++){
            new_cells[i][k] = 0
        }
    }

    if (start){
        for (i=0; i<hight; i++){
            for (k=0; k<width; k++){
                if (document.querySelector(".row"+i+".column"+k).classList.contains("life")){
                    old_cells[i][k] = 1
                }

            }
        }
        start = false
    }

    for (i=0; i<hight; i++){
        for (k=0; k<width; k++){
            n_count = neighbor_count(i, k)
            if (old_cells[i][k] == 1){
                if (n_count == 2 || n_count == 3){
                    new_cells[i][k] = 1
                } 
            } else{
                if (n_count == 3){
                    new_cells[i][k] = 1
                }
            }
        }
    }


    for (i=0; i<hight; i++){
        for (k=0; k<width; k++){
            if (new_cells[i][k]==1){
                document.querySelector(".row"+i+".column"+k).classList.add("life")
            }else{
                document.querySelector(".row"+i+".column"+k).classList.remove("life")
            }

        }
    }

    old_cells = new_cells
    timeout_id = setTimeout(start_gol, 300)
}

function neighbor_count(r, c) {
    // пересчёт живых соседей
    //  123
    //  804
    //  765

    var n_count =  0

    // 1
    if (r==0){
        check_row = hight - 1
    }else{
        check_row = r - 1
    }
    if (c==0){
        check_column = width - 1
    }else{
        check_column = c - 1
    }
    n_count += old_cells[check_row][check_column]

    // 2
    if (r==0){
        check_row = hight - 1
    }else{
        check_row = r - 1
    }
    check_column = c
    n_count += old_cells[check_row][check_column]

    //3
    if (r==0){
        check_row = hight - 1
    }else{
        check_row = r - 1
    }
    if (c==width - 1){
        check_column = 0
    }else{
        check_column = c + 1
    }
    n_count += old_cells[check_row][check_column]

    //4
    check_row = r
    if (c==width - 1){
        check_column = 0
    }else{
        check_column = c + 1
    }
    n_count += old_cells[check_row][check_column]

    //5
    if (r==hight-1){
        check_row = 0
    }else{
        check_row = r + 1
    }
    if (c==width-1){
        check_column = 0
    }else{
        check_column = c + 1
    }
    n_count += old_cells[check_row][check_column]

    //6
    if (r==hight-1){
        check_row = 0
    }else{
        check_row = r + 1
    }
    check_column = c
    n_count += old_cells[check_row][check_column]

    //7
    if (r==hight-1){
        check_row = 0
    }else{
        check_row = r + 1
    }
    if (c==0){
        check_column = width - 1
    }else{
        check_column = c - 1
    }
    n_count += old_cells[check_row][check_column]

    //8
    check_row = r
    if (c==0){
        check_column = width - 1
    }else{
        check_column = c - 1
    }
    n_count += old_cells[check_row][check_column]

    return n_count
}