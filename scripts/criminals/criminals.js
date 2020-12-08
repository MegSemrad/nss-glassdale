export const Criminals = (criminalObject) => {
    return `
        <section class="criminals">
            <h2 class="criminals__name">${criminalObject.name}</h2>
            <div class="criminals__age criminals__data">Age: ${criminalObject.age}</div>
            <div class="criminals__crime criminals__data">Crime: ${criminalObject.conviction}</div>
            <div class="criminals__term__start criminals__data">Start: ${new Date(criminalObject.incarceration.start).toLocaleDateString('en-US')}</div>
            <div class="criminals__term__end criminals__data">Release: ${new Date(criminalObject.incarceration.end).toLocaleDateString('en-US')}</div>
        </section>
    `
}