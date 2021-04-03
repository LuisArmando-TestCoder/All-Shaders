function getFlatBranchedSquares({
    square,
    limit = 100,
    branchedSquares, // recursive
    usedDirection, // recursive ... 
    // [
    //   'x#width' | 'y#height',
    //   1 | -1
    // ]
}) {
    const flatBranchedSquares = branchedSquares || []

    if (flatBranchedSquares.length === 0) {
        flatBranchedSquares.push(square)
    }

    if (flatBranchedSquares.length < limit) {
        const directionsLimit = 3
        const directionsAmount = getRandomDirectionsAmount(
            directionsLimit
        )
        let availableDirections = getAvailableDirections(
            usedDirection,
        )

        repeat(directionsAmount, () => {
            const chosenKey = getRandomItem(
                Object.keys(availableDirections)
                    .filter(
                        key => availableDirections[key].length
                    )
            )
            const chosenDirection = getRandomItem(
                availableDirections[chosenKey]
            )
            const derivedSquare = getDerivedSquare({
                key: chosenKey,
                direction: chosenDirection,
                square,
            })

            availableDirections = getAvailableDirections(
                [chosenKey, chosenDirection],
                availableDirections
            )

            flatBranchedSquares.push(derivedSquare)

            getFlatBranchedSquares({
                limit,
                square: derivedSquare,
                branchedSquares: flatBranchedSquares,
                usedDirection: [chosenKey, chosenDirection],
            })
        })
    }

    return flatBranchedSquares
}

function repeat(amount, callback) {
    for (
        let index = 0;
        index < amount;
        index++
    ) callback(index)
}

function getRandomDirectionsAmount(limit) {
    return Math.floor(
        Math.random() * (
            limit - 1
        )
    ) + 1
}

function getAvailableDirections(
    excludeDirection,
    currentDirections = null
) {
    const availableDirections = currentDirections || {
        'x#width': [1, -1],
        'y#height': [1, -1],
    }

    if (excludeDirection) {
        const [key, value] = excludeDirection

        availableDirections[key].splice(
            availableDirections[key].indexOf(value), 1
        )
    }

    return availableDirections
}

function getRandomItem(array) {
    const randomItem = array[
        Math.floor(Math.random() * array.length)
    ]

    return randomItem
}

function getDerivedSquare({
    key, // 'x#width' | 'y#height'
    direction,
    square,
}) {
    const [axis, dimension] = key.split('#')

    return {
        ...square,
        key,
        direction,
        [axis]: square[axis] + square[dimension] * direction
    }
}

function getSquare({
    size = 10,
    x, y,
}) {
    return {
        width: size,
        height: size,
        x,
        y,
        color: '#000',
    }
}

function getBoundaries(
    { width, height, x, y },
    thickness = 1
) {
    return [
        { x, y, width, height: thickness },
        { x, y, width: thickness, height },
        { x: x + width, y, width: thickness, height },
        { x, y: y + height, width, height: thickness },
    ]
}

function getOccurrencesAmount(array, value) {
    return array.reduce(
        (start, item) => (item === value ? start + 1 : start),
        0
    )
}


function getMultipleDeletedOccurrences(array) {
    const multipleDeletedOccurrences = []

    array.forEach(item => {
        const occurrencesAmount = getOccurrencesAmount(
            array, item
        )
        const maximumOverlappingOccurrences = 1

        if (occurrencesAmount === maximumOverlappingOccurrences) {
            multipleDeletedOccurrences.push(
                item
            )
        }
    })

    return multipleDeletedOccurrences
}

export function getFilteredBranchedSquaresMaze({
    limit, x, y, size
}) {
    const square = getSquare({x, y, size})

    return [
        ...new Set(
            getFlatBranchedSquares({
                square,
                limit
            } as any)
            .map(
                ({ width, height, x, y }) =>
                    ({ width, height, x, y })
            )
            .map(JSON.stringify)
        )
    ]
    .map(JSON.parse as any)
}

export function getMazeWalls(maze) {
    return getMultipleDeletedOccurrences(
        maze
            .map(plot => {
                return getBoundaries(plot).map(
                    JSON.stringify as any
                )
            }).flat()
    ).map(JSON.parse as any)
    .map(
        ({width, height, x, y}: any) => ({
            width,
            height,
            x: x + Math.floor(width / 2),
            y: y + Math.floor(height / 2)
        })
    )
}