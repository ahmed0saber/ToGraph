var xArray = []
var yArray = []

function addPoint(){
    // Get point at x
    var pointX = document.getElementById("xValue").value
    xArray.push(parseInt(pointX))
    document.getElementById("xValue").value = ''

    // Get point at y
    var pointY = document.getElementById("yValue").value
    yArray.push(parseInt(pointY))
    document.getElementById("yValue").value = ''

    // Render the point (x, y)
    document.getElementsByClassName("records")[0].innerHTML += `
    <p>(${pointX}, ${pointY})</p>
    `
}


function drawGraph(){
    // Calculate Sums
    var xSum=0, ySum=0, xxSum=0, xySum=0
    var count = xArray.length
    for (var i=0; i<count; i++){
        xSum += xArray[i]
        ySum += yArray[i]
        xxSum += xArray[i] * xArray[i]
        xySum += xArray[i] * yArray[i]
    }

    // Calculate slope and intercept
    var slope = (count * xySum - xSum * ySum) / (count * xxSum - xSum * xSum)
    var intercept = (ySum / count) - (slope * xSum) / count

    // Generate values
    var xValues = []
    var yValues = []
    for (var x=Math.min(...xArray); x<=Math.max(...xArray); x+=1) {
        xValues.push(x)
        yValues.push(x * slope + intercept)
    }

    // Prepare data of 2 graphs
    var data = [
        {x:xArray, y:yArray, mode:"markers"},
        {x:xValues, y:yValues, mode:"line"}
    ]

    // Prepare layout (graph title and axis labels)
    var graphTitle = document.getElementById("title").value
    var xAxis = document.getElementById("xAxis").value
    var yAxis = document.getElementById("yAxis").value
    var layout = {
        xaxis: {range: [Math.min(...xArray)-1, Math.max(...xArray)+1], title: xAxis},
        yaxis: {range: [Math.min(...yArray)-1, Math.max(...yArray)+1], title: yAxis},
        title: graphTitle
    }

    // Draw the graphs using plotly and display slope
    Plotly.newPlot("myPlot", data, layout)
    document.getElementById("slope").textContent = slope.toFixed(4)
    document.getElementsByClassName("slope-info")[0].style.display = "block"
}