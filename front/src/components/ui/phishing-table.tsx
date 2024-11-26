import { Phishing } from "@/services/phishingService"

interface PhishingTableProps {
    data: Phishing[]
}

const PhishingTable = ({ data }: PhishingTableProps) => {
    return (
        <table className="min-w-full border-collapse border border-gray-200">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2">Email</th>
                    <th className="border border-gray-200 px-4 py-2">Content</th>
                    <th className="border border-gray-200 px-4 py-2">Status</th>
                    <th className="border border-gray-200 px-4 py-2">Created At</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item._id} className="odd:bg-white even:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">{item.email}</td>
                        <td className="border border-gray-200 px-4 py-2 cursor-pointer"
                            dangerouslySetInnerHTML={{ __html: item.content }}></td>
                        <td className="border border-gray-200 px-4 py-2">{item.status}</td>
                        <td className="border border-gray-200 px-4 py-2">{new Date(item.createdAt).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default PhishingTable