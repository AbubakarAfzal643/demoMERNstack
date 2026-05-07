import {toast} from 'react-toastify'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Student = () => {
    const [name, setName] = useState('')
    const [rollNumber, setrollNumber] = useState('')
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

    const fetchDemoData = async () => {
        setLoading(true)
        try {
            const studentsData = await axios.get(`${API_URL}/students`)
            setStudents(studentsData.data)
        } catch (error) {
            console.error('Error fetching data : ', error)
            toast.error('Failed to load students')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDemoData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name.trim() || !rollNumber.trim()){
            toast.warning('Please fill in all fields')
            return;
        }

        setIsSubmitting(true)
        try {
            await axios.post(`${API_URL}/students`, {name, rollNumber})
            setName('')
            setrollNumber('')
            await fetchDemoData()
            toast.success('🎉 Student added successfully!', {
                icon: '✨',
                className: 'glass-effect',
            })
        } catch (error) {
            toast.error('❌ Failed to add student')
            console.error('Error adding student : ', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <main className="relative z-10 max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-bold font-space-grotesk mb-3">
                        <span className="gradient-text">Student Management</span>
                    </h1>
                    <p className="text-gray-400 text-lg">Add, view, and manage your students with ease</p>
                </div>

                <div className="mb-12 glass-effect border border-white/20 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="text-3xl">➕</span> Add New Student
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    className="input-elegant w-full"
                                    placeholder="Student name..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isSubmitting}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors">
                                    👤
                                </div>
                            </div>

                            <div className="relative group">
                                <input 
                                    type="text" 
                                    className="input-elegant w-full"
                                    placeholder="Roll number..."
                                    value={rollNumber}
                                    onChange={(e) => setrollNumber(e.target.value)}
                                    disabled={isSubmitting}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors">
                                    #
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting || loading}
                            className="btn-primary w-full btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isSubmitting ? 'Adding...' : '🚀 Add Student'}
                            </span>
                        </button>
                    </form>
                </div>

                <div className="glass-effect border border-white/20 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="text-3xl">📚</span> All Students ({students.length})
                    </h2>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="relative w-12 h-12">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-75 animate-spin"></div>
                                <div className="absolute inset-2 bg-slate-900 rounded-full"></div>
                            </div>
                        </div>
                    ) : students.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📭</div>
                            <p className="text-gray-400 text-lg">No students yet. Add one to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {students.map((student, index) => (
                                <div 
                                    key={student._id} 
                                    className="group card-gradient border border-slate-700/50 rounded-2xl p-4 md:p-6 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-102 list-item-enter"
                                    style={{
                                        animation: `slideInUp 0.4s ease-out ${index * 50}ms both`
                                    }}
                                >
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                                    {student.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                                        {student.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-400 badge-glow inline-block px-3 py-1 rounded-full mt-1">
                                                        Roll: {student.rollNumber}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                                            <span className="text-xs text-gray-500 md:text-right">
                                                📅 {new Date(student.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Student
