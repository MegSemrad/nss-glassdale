export const Criminals = (criminalObject) => {
    return `
        <section class="criminals">
            <h2 class="criminals__name">${criminalObject.name}</h2>
            <div class="criminals__age criminals__data">${criminalObject.age}</div>
            <div class="criminals__crime criminals__data">${criminalObject.conviction}</div>
            <div class="criminals__term__start criminals__data">${new Date(criminalObject.incarceration.start).toLocaleDateString('en-US')}</div>
            <div class="criminals__term__end criminals__data">${new Date(criminalObject.incarceration.end).toLocaleDateString('en-US')}</div>
        </section>
    `
}