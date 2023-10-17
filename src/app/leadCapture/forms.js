"use client"
import {useState} from 'react'

export default function LeadCaptureForm () {
    const [loading, setLoading] = useState(false)

    const handleForm = async (event) => {
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.target)
  
        const dataObject = Object.fromEntries(formData)

        const jsonData = JSON.stringify(dataObject)

        const options = {
            method: "POST", // HTTP POST
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        }

        // fetch
        const response = await fetch("/api/leads/", options)
        const responseData = await response.json()
        console.log('responseData', responseData)
        setLoading(false)

    }
    const btnLabel = loading ? "Loading" : "Join List"
    return <form className='space-y-3' onSubmit={handleForm}>
        <input type='email' required name='email' placeholder="Your Email" />
        <button disabled={loading} className='btn-join' type='submit'>{btnLabel}</button>
    </form>
}