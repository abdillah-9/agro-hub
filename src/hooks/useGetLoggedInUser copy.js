export async function useGetLoggedInUser(){
    const userData = {};
    try{
        const res = await fetch('/getLoggedInUser',{
            method: "POST",
            body: formData,
        });

        if(res.ok){
            const data = res.json();
            userData = data.userData;
            console.log(data.message);
        }
    }
    catch(e){
        console.log("Failed to fetch user fronted err: "+e);
    }

    return {userData}
}