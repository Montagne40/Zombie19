'use strict'

const people = [
    {
        name: 'A',
        age: 3,
        infected: false,
        acquaintances: [
            {
                name: 'B',
                age: 86,
                infected: true,
                acquaintances: [
                    {
                        name: 'C',
                        age: 30,
                        infected: false,
                        acquaintances: []
                    },
                    {
                        name: 'D',
                        age: 99,
                        infected: true,
                        acquaintances: []
                    },
                    {
                        name: 'E',
                        age: 27,
                        infected: false,
                        acquaintances: [
                            {
                                name: 'F',
                                age: 38,
                                infected: false,
                                acquaintances: []
                            }
                        ]
                    }
                ]
            },
            {
                name: 'G',
                age: 87,
                infected: false,
                acquaintances: []
            },
            {
                name: 'H',
                age: 7,
                infected: true,
                acquaintances: [
                    {
                        name: 'I',
                        age: 42,
                        infected: false,
                        acquaintances: [
                            {
                                name: 'J',
                                age: 19,
                                infected: true,
                                acquaintances: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
];


function zombieA(people) {
    // parcourir les personnes en profondeur d'abord
    function FirstPeople(person) {
        if (!person.infected) {
            // marquer la personne comme infectée
            person.infected = true;
            console.log(person.name + " a été infecté !");
            // infecter tous les connaissances de la personne
            person.acquaintances.forEach(FirstPeople);
        }
    }

    // infecter la première personne (la racine de la hiérarchie sociale)
    FirstPeople(people[0]);
}


function zombieB(people) {
    let infected = []; // tableau pour stocker les personnes infectées
    let newInfections = true;

    // infecter toutes les personnes qui n'ont pas d'acquaintances
    people.forEach((person) => {
        if (person.acquaintances.length === 0) {
            person.infected = true;
            infected.push(person);
            console.log(person.name + " a été infecté !");
        }
    });

    // infecter les personnes ayant au moins une connaissance infectée
    while (newInfections) {
        newInfections = false;
        people.forEach((person) => {
            if (
                !person.infected &&
                person.acquaintances.some(
                    (acquaintance) => infected.indexOf(acquaintance) !== -1
                )
            ) {
                person.infected = true;
                infected.push(person);
                console.log(person.name + " a été infecté !");
                newInfections = true;
            }
        });
    }
}


function zombie32(people) {
    // parcourir les personnes en profondeur d'abord
    function FirstPeople(person) {
        if (person.age >= 32 && !person.infected) {
            // marquer la personne comme infectée
            person.infected = true;
            console.log(person.name + " a été infecté !");
            // infecter tous les connaissances de la personne
            person.acquaintances.forEach(FirstPeople);
        } else if (person.acquaintances.some((acq) => acq.infected && acq.age >= 32)) {
            // si l'un des connaissances de la personne est infecté et a 32 ans ou plus, infecter la personne
            person.infected = true;
            console.log(person.name + " a été infecté par un contact infecté de 32 ans ou plus !");
        }
    }

    // infecter les personnes de 32 ans ou plus en partant de la première personne (la racine de la hiérarchie sociale)
    FirstPeople(people[0]);
}





function zombieC(people) {
    // Diviser les personnes en groupes sociaux qui ne sont pas en contact direct Ascendant ou Descendant
    const groups = [];
    const visited = new Set();

    function bfs(person) {
        const group = [];
        const queue = [person];

        while (queue.length) {
            const curr = queue.shift();
            if (visited.has(curr)) continue;
            visited.add(curr);
            group.push(curr);
            curr.acquaintances.forEach((acq) => {
                if (!visited.has(acq)) {
                    queue.push(acq);
                }
            });
        }

        if (group.length > 1) {
            groups.push(group);
        }
    }

    people.forEach((person) => {
        if (!visited.has(person)) {
            bfs(person);
        }
    });

    // infecter une personne sur deux dans chaque groupe social
    groups.forEach((group) => {
        const toInfect = Math.ceil(group.length / 2);
        const shuffledGroup = group.sort(() => Math.random() - 0.5);
        for (let i = 0; i < toInfect; i++) {
            const person = shuffledGroup[i];
            if (!person.infected) {
                person.infected = true;
                console.log(person.name + " a été infecté !");
            }
        }
    });
}


function VaccinA1(people) {
    for (let i = 0; i < people.length; i++) {
        if (people[i].age >= 0 && people[i].age <= 30) {
            people[i].infected = false;
        }
    }
    return people;
}

function VaccinB1(people) {
    let zombiesBAndC = people.filter(person => person.isZombie && (person.type === "zombieB" || person.type === "zombieC"));
    zombiesBAndC.forEach((person, index) => {
        if (index % 2 === 0) {
            let randomIndex = Math.floor(Math.random() * zombiesBAndC.length);
            zombiesBAndC.splice(randomIndex, 1);
        } else {
            person.heal();
        }

    });
}

zombieA(people);
zombieB(people);
zombieC(people);
zombie32(people);