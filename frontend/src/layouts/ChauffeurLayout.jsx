import { Outlet, Link } from 'react-router-dom';

const ChauffeurLayout = () => {
    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-800">
            <aside className="w-20 lg:w-64 bg-indigo-800 text-indigo-100 flex flex-col fixed h-full z-20 transition-all duration-300">
                <div className="p-6 flex items-center gap-3 mb-6 bg-indigo-950/30">
                    <span className="font-bold text-xl text-white hidden lg:block tracking-tight">Chauffeur</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {[
                        {
                            icon: 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M3 10C3 10.5523 3.44772 11 4 11L12 11C12.5523 11 13 10.5523 13 10V4C13 3.44772 12.5523 3 12 3H4C3.44772 3 3 3.44772 3 4V10ZM11 20C11 20.5523 11.4477 21 12 21H20C20.5523 21 21 20.5523 21 20V14C21 13.4477 20.5523 13 20 13H12C11.4477 13 11 13.4477 11 14V20ZM13 15H19V19H13V15ZM3 20C3 20.5523 3.44772 21 4 21H8C8.55229 21 9 20.5523 9 20V14C9 13.4477 8.55229 13 8 13H4C3.44772 13 3 13.4477 3 14V20ZM5 19V15H7V19H5ZM5 9V5L11 5L11 9L5 9ZM20 11C20.5523 11 21 10.5523 21 10V4C21 3.44772 20.5523 3 20 3H16C15.4477 3 15 3.44772 15 4V10C15 10.5523 15.4477 11 16 11H20ZM19 9H17V5H19V9Z">
                    </path>
                </svg>,
                            label: 'Tableau de bord', active: true
                        },
                        {
                            icon: 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M3 10C3 10.5523 3.44772 11 4 11L12 11C12.5523 11 13 10.5523 13 10V4C13 3.44772 12.5523 3 12 3H4C3.44772 3 3 3.44772 3 4V10ZM11 20C11 20.5523 11.4477 21 12 21H20C20.5523 21 21 20.5523 21 20V14C21 13.4477 20.5523 13 20 13H12C11.4477 13 11 13.4477 11 14V20ZM13 15H19V19H13V15ZM3 20C3 20.5523 3.44772 21 4 21H8C8.55229 21 9 20.5523 9 20V14C9 13.4477 8.55229 13 8 13H4C3.44772 13 3 13.4477 3 14V20ZM5 19V15H7V19H5ZM5 9V5L11 5L11 9L5 9ZM20 11C20.5523 11 21 10.5523 21 10V4C21 3.44772 20.5523 3 20 3H16C15.4477 3 15 3.44772 15 4V10C15 10.5523 15.4477 11 16 11H20ZM19 9H17V5H19V9Z">
                    </path>
                </svg>,
                            label: 'Investissements', active: false
                        },
                        {
                            icon: 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M3 10C3 10.5523 3.44772 11 4 11L12 11C12.5523 11 13 10.5523 13 10V4C13 3.44772 12.5523 3 12 3H4C3.44772 3 3 3.44772 3 4V10ZM11 20C11 20.5523 11.4477 21 12 21H20C20.5523 21 21 20.5523 21 20V14C21 13.4477 20.5523 13 20 13H12C11.4477 13 11 13.4477 11 14V20ZM13 15H19V19H13V15ZM3 20C3 20.5523 3.44772 21 4 21H8C8.55229 21 9 20.5523 9 20V14C9 13.4477 8.55229 13 8 13H4C3.44772 13 3 13.4477 3 14V20ZM5 19V15H7V19H5ZM5 9V5L11 5L11 9L5 9ZM20 11C20.5523 11 21 10.5523 21 10V4C21 3.44772 20.5523 3 20 3H16C15.4477 3 15 3.44772 15 4V10C15 10.5523 15.4477 11 16 11H20ZM19 9H17V5H19V9Z">
                    </path>
                </svg>,
                            label: 'Statistiques', active: false
                        },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-4 p-3 rounded-lg transition-colors ${item.active
                                ? 'text-white hover:bg-indigo-800/50 hover:text-white'
                                : 'text-white hover:bg-indigo-800/50 hover:text-white'
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span className="hidden lg:block font-medium text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-indigo-800/50">
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg text-white hover:bg-indigo-950 hover:text-white transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z">
                        </path>
                        </svg>
                        <span className="hidden lg:block font-medium text-sm">Retour Portail</span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 ml-20 lg:ml-64 p-8 lg:p-12">
                <Outlet />
            </main>
        </div>
    );
};

export default ChauffeurLayout;