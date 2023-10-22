getPercentages()
async function getPercentages() {

    percentage_object = {}
    console.log("running")
    await fetch('http://localhost:3000/categorize').then(res=> res.json()).then(data => percentage_object = data)
    // const movies = await response.json();
    console.log(percentage_object)
    console.log("done")

}