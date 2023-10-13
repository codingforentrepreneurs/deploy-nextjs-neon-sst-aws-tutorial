"use client"


export default function LeadCaptureForm () {

    const handleForm = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        console.log(formData)
        const dataObject = Object.fromEntries(formData)
        console.log(dataObject)
        const jsonData = JSON.stringify(dataObject)
        console.log(jsonData)
        const options = {
            method: "POST", // HTTP POST
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        }
        console.log(options)

        // fetch
        // const response = await fetch("/api/leads/", options)
        // console.log(response)

    }

    return <form className='space-x-3' onSubmit={handleForm}>
        <input type='email' required name='email' placeholder="Your Email" />
        <button className='bg-green-500 hover:bg-green-700 text-white px-3 rounded' type='submit'>Join list</button>
    </form>
}