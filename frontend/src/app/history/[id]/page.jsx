'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'

const ReportDetail = () => {
    const { id } = useParams()
    const router = useRouter()
    const [report, setReport] = useState(null)

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get("http://localhost:5000/api/users/history", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                // History mein se is ID wali scan dhoondo
                const singleReport = res.data.find(item => item._id === id)
                setReport(singleReport)
            } catch (err) {
                console.error("Error fetching report", err)
            }
        }
        if (id) fetchReport()
    }, [id])

    if (!report) return <div className="p-10 text-center font-bold">Loading Report Details...</div>

    return (
        <main className="m-8 p-6 bg-white border-2 border-orange-500 rounded-2xl shadow-xl">
            <button onClick={() => router.back()} className="mb-4 text-orange-600 font-bold">
                ← Back to History
            </button>
            <h1 className="text-3xl font-bold mb-4">Analysis Details</h1>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p><strong>Website:</strong> {report.website}</p>
                <p><strong>Type:</strong> <span className="capitalize">{report.type}</span></p>
                <p><strong>Date:</strong> {new Date(report.createdAt).toLocaleString()}</p>
            </div>

            <table className="min-w-full border ">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left">Sr.</th>
                        <th className="p-3 text-left">Broken URL / Path</th>
                    </tr>
                </thead>
                <tbody>
                    {report.results.map((item, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3 text-blue-600">{item.url || item}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}

export default ReportDetail