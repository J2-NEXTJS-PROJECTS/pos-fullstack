"use server"

export const uploadImage=async(formData:FormData):  Promise<string>=> {

    const url=`${process.env.API_URL}/products/upload-image`
    const req =await fetch(url, {
        method:'POST',
        body: formData
    })
    const json=await req.json()
    return json.secure_url

}