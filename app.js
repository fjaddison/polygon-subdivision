let start

function setup() {
    createCanvas(1000, 1000)

    start = [
        createVector(random(50, 150), random(50, 150)),
        createVector(random(850, 950), random(50, 150)),
        createVector(random(850, 910), random(850, 950)),
        createVector(random(50, 150), random(850, 950))
    ]
}

function draw() {
    background(0)
    noFill()
    stroke(255)
    beginShape()
    start.forEach(p => vertex(p.x, p.y))
    endShape(CLOSE)
    let subPoints = subdivide(start)
    drawSubdivision(subPoints)
    noLoop()
}

function subdivide(points) {
    let edges = []
    let center = centroid(points)
    center.x *= random(0.8, 1.2)
    center.y *= random(0.8, 1.2)

    for (i = 0; i < points.length; i++) {
        let x
        let y

        // rf for random float
        let rf = random(0.3, 0.6)

        if (i == points.length - 1) {
            x = lerp(points[i].x, points[0].x, rf)
            y = lerp(points[i].y, points[0].y, rf)
        } else {
            x = lerp(points[i].x, points[i + 1].x, rf)
            y = lerp(points[i].y, points[i + 1].y, rf)
        }

        edges.push(createVector(x, y))
    }

    return { center, edges }
}

function centroid(points) {
    let xp = []
    let yp = []

    points.forEach(p => {
        xp.push(p.x)
        yp.push(p.y)
    })

    return  createVector(mean(xp), mean(yp))
}

function mean(values) {
    return values.reduce((a, b) => a + b) / values.length
}

function drawSubdivision(innerPoints) {
    innerPoints.edges.forEach(p => {
        line(
            innerPoints.center.x,
            innerPoints.center.y,
            p.x,
            p.y
        )
    })
}
