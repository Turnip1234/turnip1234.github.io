const net = new brain.recurrent.GRU({
    hiddenLayers: [60, 50, 40, 20, 10, 20]
});
const rawData = document.getElementById("input");
const a = document.getElementById("answer");
const pcnt = document.getElementById("pcnt");
var common = ["?", ".", ";", "&", ",", "how", "what is", "a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];
function getUncommon(sentence, common) {
    var wordArr = sentence.match(/\w+/g),
        commonObj = {},
        uncommonArr = [],
        word, i;
    for ( i = 0; i < common.length; i++ ) {
        commonObj[ common[i].trim() ] = true;
    }
    for ( i = 0; i < wordArr.length; i++ ) {
        word = wordArr[i].trim().toLowerCase();
        if ( !commonObj[word] ) {
            uncommonArr.push(word);
        }
    }
    return uncommonArr;
}
function submit() {
    loading(true);
    const data = rawData.value.toString().toLowerCase().split(/[\.\,\?\!\;]/);
    var maxIter = parseInt(prompt("How much training? (More training takes longer but provides higher quality results)", "500"))
    var increment = 100/maxIter;
    var step = 0; 
    console.log("Training neural net...");
    const d = new Date();
    const stats = net.train(data, {
        iterations: maxIter,
        log: false,
        callback: function() {
            step += increment;
            console.log(step + "%");
        },
        callbackPeriod: 1,
        learningRate: 0.8
    });
    console.log(`Net trained in ${(new Date() - d) /1000} seconds.`);
    //console.log(`Net trained in ${stats.iterations} iterations with ${stats.error} error`);
    console.log(stats)
    a.style.display = "block";
    loading(false);
}
function question() {
    a.innerHTML = net.run(getUncommon(prompt("Question?"), common)) + ".";
}
function loading(bool) {
    if(bool) {
        document.getElementById("loading").style.display = "block";
    } else {
        document.getElementById("loading").style.display = "none";
    }
}
