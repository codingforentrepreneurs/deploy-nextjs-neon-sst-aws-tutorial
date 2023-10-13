
import getSecret from "../lib/secrets";


getSecret("DATABASE_URL").then((val)=>{
    console.log(`${val}`.slice(0, 25))
}).catch((err)=>{
    console.log("err", err)
})