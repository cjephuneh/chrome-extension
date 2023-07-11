export default function GeneralInfo(){
    return (
        <div className="w-1/5 mt-6 px-2 bg-white rounded-lg">
            <h2 className="text-xl font-bold">General Info</h2>
           
            <div className="mt-4 bg-gray-100 py-2">
                <div className="space-y-3 bg-white mx-2 p-2 rounded">
                    <div className="flex justify-between items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="bg-red-100 text-red-400 px-4 py-1 rounded-full">• Responded</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">John Doe</p>
                            <p className="text-sm">(254) 123 456 789</p>
                        </div>
                        <div className="bg-blue-200 text-blue-600 p-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-3  p-2">
                    <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-sm">johndoe@email.com</p>
                    </div>
                    <div>
                        <p className="font-semibold">Date created</p>
                        <p className="text-sm">Sep 22, 2022</p>
                    </div>
                </div>
            </div>
        </div>
    )
}