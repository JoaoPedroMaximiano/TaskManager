import { Link, Head } from '@inertiajs/react';

export default function Home(props) {
    return <>
        <Head title="Welcome" />
        <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-gray-100">
            <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
                {props.auth.user ? (
                    <div className="flex gap-5 items-center">
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm"
                        >
                            Dashboard
                        </Link>

                        <Link href={route('logout')} as="button" method='post' className="font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm">
                            Sair
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm"
                        >
                            Login
                        </Link>

                        <Link
                            href={route('register')}
                            className="ml-4 font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm"
                        >
                            Registrar
                        </Link>
                    </>
                )}
            </div>

            <div className="max-w-7xl mx-auto p-6 lg:p-8">
                <h1>Bem-vindo</h1>
                <Link
                    href={route('dashboard')}
                    className="text-2xl font-semibold text-blue-600 hover:text-blue-900 focus:outline focus:outline-2 focus:rounded-sm"
                >
                    Gerenciar tarefas
                </Link>
            </div>
        </div>
    </>;
}
