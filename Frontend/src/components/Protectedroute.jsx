import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { auth } from '../config/firebase'

const Protect = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">Loading...</p>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return children
}

export default Protect