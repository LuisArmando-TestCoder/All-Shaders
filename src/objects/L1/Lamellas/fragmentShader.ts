export default `
uniform float iTime;
uniform vec3 iResolution;
varying vec3 fragCoord;

const int pointsAmount = 30;

float getDistanceField(
    vec2[pointsAmount] points,
    vec2 position,
    float minimumDistance
) {
    for (int i = 0; i < points.length(); i++) {
        float currentDistance = distance(
            position,
            points[i]
        );

        if (currentDistance < minimumDistance) {
            minimumDistance = currentDistance;
        }
    }
    
    return minimumDistance;
}

vec3 getDistanceFieldColor(vec3 color, float distanceField, float size, float colorRoof) {
    float maximizedDistanceField = min(
        distanceField * size, 
        colorRoof
    );
    float invertedDistanceField = colorRoof - maximizedDistanceField;
    vec3 distanceFieldColor = color * invertedDistanceField;

    return distanceFieldColor;
}

vec2[pointsAmount] getDisplacedCellPositions() {
    vec2 cellPositions[pointsAmount];
    
    int index = 0;
    bool canDisplaceX = false;

    for (
        float y = -.5;
        y < .75;
        y += .25
    ) {
        for (
            float x = -.5;
            x < .5;
            x += .25, index++
        ) {
            cellPositions[index] = vec2(x, y);
            
            if(canDisplaceX) {
                cellPositions[index].x -= -.25 / 2.;
            }
        }

        canDisplaceX = !canDisplaceX;
    }
    
    return cellPositions;
}

void main() {
    vec2 position = fragCoord.xy / (iResolution.xy / 500.);

    // squares resolution
    position.x *= iResolution.x / iResolution.y;
    position.x += -.125;

    float distanceField = getDistanceField(
        getDisplacedCellPositions(),
        position,
        1.
    );
    vec3 color = vec3(
        1. - distanceField,
        0.,
        distanceField * 2.
    );
    float contrast = 1.75;
    vec3 distanceFieldColor = getDistanceFieldColor(
        color,
        distanceField * contrast,
        1.,
        .75
    ) * contrast;

    gl_FragColor = vec4(
        distanceFieldColor,
        1.0
    );    
}
`