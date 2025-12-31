export async function useGetUserFromCookie(){
    const userData = {user_id:'', user_role:''};
    try{
        const res = await fetch('/get_user_from_cookie',{
            method: "POST",
            body: formData,
            credentials:'include'
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