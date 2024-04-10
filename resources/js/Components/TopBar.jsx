import { Link } from "@inertiajs/react";

export default function TopBar(props) {
    return <div className="w-full border-b border-blue-500 p-5 md:px-10 flex justify-between items-center">
        <h2>Gerenciar tarefas</h2>

        {
            !props.auth?.user &&
            <div className="flex gap-4 items-center">
                <Link href={route('login')} className="font-semibold text-gray-600 hover:text-gray-900 hover:underline">
                    Login
                </Link>
                <Link href={route('register')} className="font-semibold text-gray-600 hover:text-gray-900 hover:underline">
                    Registrar
                </Link>
            </div>
        }

        {
            props.auth?.user &&
            <>
                <p>{props.auth.user}</p>
                <Link href={route('logout')} className="font-semibold text-gray-600 hover:text-gray-900 hover:underline">
                    Sair
                </Link>
            </>
        }
    </div>
}