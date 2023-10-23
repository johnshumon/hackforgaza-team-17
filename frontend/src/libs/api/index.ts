import axios from "axios";
const API_ENDPOINT_BASE_URL = "http://localhost:3000"

export async function getIncidents(n?: number) {
    const result = await axios.get(`${API_ENDPOINT_BASE_URL}/incidents`, {
        params: {
            random: n
        }
    });
    if (result.status === 200) 
    {
        // console.log(result.data.data.result);
        return result.data.data.result.map((incidentWithContext:any)=>{
            console.log(incidentWithContext)
            return {
                position: {
                    lat: incidentWithContext?.incident?.location?.[0]?.x,
                    lng: incidentWithContext?.incident?.location?.[0]?.y
                }
            }
        });
    }
}