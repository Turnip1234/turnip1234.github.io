function submit() {
    if(!window.Worker) {
        const net = new brain.recurrent.LSTM();
        var rawData = document.getElementById("input");
        var q = document.getElementById("q");
        var a = document.getElementById("answer");
        const data = rawData.value.toString().toLowerCase().split(".").split(",").split("!").split("?");
        console.log("Training neural net...");
        a.style.display = "block";
        const d = new Date();
        net.train(data, {
            iterations: parseInt(prompt("How much training? (More training takes longer)", "1000")),
           log: true,
           logPeriod: 100
        });
        console.log(`Neural net trained in ${(new Date() - d) /1000} seconds.`);
        q.style.display = "block";
    }
    else {
        var worker1 = new Worker('./worker.js');
        worker1.postMessage();
        worker1.onmessage = function(e) {
            console.log(e.data)
        }
    }
}
function question() {
    q = document.getElementById("q");
    document.getElementById("answer").innerHTML = net.run(q.value.toString);
}