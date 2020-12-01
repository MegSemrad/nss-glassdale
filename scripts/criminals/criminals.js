export const Criminals = (criminals) => {
    return `
        <section class="criminals">
            <h2 class="criminals__name">${criminals.name}</h2>
            <div class="criminals__age criminals__data">${criminals.age}</div>
            <div class="criminals__crime criminals__data">${criminals.conviction}</div>
            <div class="criminals__term__start criminals__data">${new Date(criminals.incarceration.start).toLocaleDateString('en-US')}</div>
            <div class="criminals__term__end criminals__data">${new Date(criminals.incarceration.end).toLocaleDateString('en-US')}</div>
        </section>
    `
}