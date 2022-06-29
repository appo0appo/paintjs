const canvas=document.querySelector("#jsCanvas")
const ctx= canvas.getContext("2d")//context란?: 픽셀에 접근할 수 있는 방법. canvas안에 있는 픽셀을 이용할 수 있게된다//
const colors=document.querySelectorAll(".jsColor")
const range=document.querySelector("#jsRange")
const mode=document.querySelector("#jsMode")
const save=document.querySelector("#jsSave")

const INITIAL_COLOR="#2c2c2c"


canvas.width=700
canvas.height=700 //canvas의 픽셀 사이즈를 써야 작동된다.//

ctx.fillStyle="white"
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.strokeStyle=INITIAL_COLOR //strokeStyle은 색상이나 스타일을 라인에 사용할 수 있다. 우리가 그릴 색들이 모두 이 색을 갖는다고 말해주는 코드. //
ctx.fillStyle=INITIAL_COLOR
ctx.lineWidth= 2.5//선의 굵기//

let painting=false
let filling=false

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true
}

function onMouseMove(event){
    const x= event.offsetX
    const y= event.offsetY
    if(!painting){ //!painting= not painting 페인팅이 아니면
        ctx.beginPath()//선의 시작점을 만드는 것. path는 기본적인 선(line)
        ctx.moveTo(x, y)//path가 만들어는 지지만 사옹되어지지는 않는다
    }else{
        ctx.lineTo(x, y)// 현제 sub-path의 마지막 점을 특정 좌표와 직선으로 연결한다.
        ctx.stroke()//stroke style로 현재의 sub-path에 획을 그음.
    }
}



function handleColorClick(event){
    const color= event.target.style.backgroundColor
    ctx.strokeStyle= color
    ctx.fillStyle= color
}

function handleRangeChange(event){
    const size=event.target.value
    ctx.lineWidth=size
}

function fillCanvas(){
    ctx.fillRect()
}

function handleModeClick(){
    if(filling===true){
        filling=false
        mode.innerText="Fill"
    }else{
        filling=true
        mode.innerText="Paint"
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }else{
    }
}

function handleCM(event){
    event.preventDefault()
}

function handleSaveClick(){
    const image=canvas.toDataURL() //image를 url로 만들어준다
    const link= document.createElement("a")
    link.href=image
    link.download="paintJS"//83+84+85= html <a href="canvas.toDataURL()" download="paintJS"></a>, paintJS는 임의의 이름이다.
    link.click()// save 버튼을 누르면 실제 html에 떠있지 않은 가상의 링크를 클릭한다. 여기선 링크를 클릭하면 다운로드. save 버튼이 링크가 되는 셈
}





if(canvas){
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color=> color.addEventListener("click", handleColorClick))//Array.from은 어떤 요소든 array로 만들어준다.

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick)
}

if(save){
    save.addEventListener("click", handleSaveClick)
}