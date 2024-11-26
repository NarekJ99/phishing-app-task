import { getPhishings, Phishing } from "@/services/phishingService"
import { useEffect, useState } from "react"
import PhishingTable from "./ui/phishing-table"

const Home = () => {
    const [data, setData] = useState<Phishing[]>([])

    useEffect(() => {
        const fetchPhishings = async () => {
            try {
                const response = await getPhishings()
                if(response){
                    setData(response)
                }
            } catch (error) {
                console.log("Error geting phishings:", error)
            }
        }
        fetchPhishings()
    }, [])

    return (
        <div className="overflow-x-auto mt-10 p-3">
            <PhishingTable data={data} />
        </div>
    )
}

export default Home