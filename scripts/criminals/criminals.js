export const Criminals = (criminals) => {
    return `
        <section class="criminals">
            <div class="criminals__name">${criminals.name}</div>
            <div class="criminals__age">${criminals.age}</div>
            <div class="criminals__crime">${criminals.conviction}</div>
            <div class="criminals__term__start">${new Date(criminals.incarceration.start).toLocaleDateString('en-US')}</div>
            <div class="criminals__term__end">${new Date(criminals.incarceration.end).toLocaleDateString('en-US')}</div>
        </section>
    `
}