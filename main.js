"use strict";

function makeBeing() {
    return {
        mutable: {
            life: randInt(0, 5),
            speed: randInt(0, 5),
            something: randInt(0, 5)
        }
    };
}

function score(being) {
    return Math.abs(Math.pow(being.mutable.life, 2) +
        Math.pow(being.mutable.speed, 2) -
        Math.pow(being.mutable.something, 2));
}

function sortBeings(beingA, beingB) {
    return score(beingA) < score(beingB);
}

function createInitialPopulation(count) {
    var population = [];

    for (var i = 0; i < count; i++) {
        population.push(makeBeing());
    }

    return population;
}

function mutateValue(value) {
    return (Math.random() * 0.02 + 0.99) * value;
}

function displayBeing(being) {
    var div = document.getElementById("pop");

    for (var attr in being.mutable) {
        div.innerHTML += Math.round(being.mutable[attr]) + "\t";
    }

    div.innerHTML += "\t\t" + Math.round(score(being));

    div.innerHTML += "\n";
}

function displayPopulation(population) {
    var div = document.getElementById("pop");

    for (var i in population) {
        displayBeing(population[i]);
    }

    div.innerHTML += "\n";
}

function mutate(being) {
    var mutated = being;

    for (var attr in mutated.mutable) {
        mutated.mutable[attr] = mutateValue(mutated.mutable[attr]);
    }

    return mutated;
}

function mate(mother, father) {
    var child = makeBeing();

    for (var attr in child.mutable) {
        child.mutable[attr] = (mother.mutable[attr] + father.mutable[attr]) / 2;
    }

    return child;
}

function randInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function randomChildren(population) {
    var motherIndex = randInt(0, population.length),
        fatherIndex = randInt(0, population.length);

    return mate(population[motherIndex], population[fatherIndex]);
}

function generation(population) {
    var being, sortedPopulation = population, selected, children;

    // sort by descending score
    sortedPopulation.sort(sortBeings);

    // select best fitting beings
    selected = sortedPopulation.slice(0, 5);

    // mutate
    for (var i in selected) {
        selected[i] = mutate(selected[i]);
    }

    // mate
    children = selected;
    while (children.length < population.length) {
        children.push(randomChildren(selected));
    }

    return children;
}


var population = createInitialPopulation(100);

displayPopulation(population);

for (var i = 0; i < 1000; i++) {
    population = generation(population);
}

displayPopulation(population);
