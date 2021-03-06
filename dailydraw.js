function setup() {
    var canvas = createCanvas(750*1.3, 440*1.3);
    var slider = document.getElementById("slider")
    canvas.parent('drawholder');
    background("#bbb");
    document.getElementById('bcolor').value = "#010101";
    strokeWeight(7);
    slider.value = 7;
    stroke(color(document.getElementById("bcolor").value.toString()));
    canvas.id = "editor"
}
function draw() {
    if(mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    stroke(color(document.getElementById("bcolor").value.toString()));
}
slider.oninput = function() {
    strokeWeight(slider.value);
}

function cleardraw() {
    background("#bbb");
}
function erasorPen() {
    document.getElementById('bcolor').value = "#bbbbbb";
    document.getElementById('bcolor').style.visibility = "hidden"; 
    document.getElementById('hue').style.visibility = "hidden"; 
}
function penErasor() {
    document.getElementById('bcolor').value = "#010101";
    document.getElementById('bcolor').style.visibility = "visible";
    document.getElementById('hue').style.visibility = "visible"; 
}