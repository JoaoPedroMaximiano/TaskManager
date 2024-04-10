import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PencilSimple, Trash } from '@phosphor-icons/react';

export default function Dashboard(props) {
    let {tarefas} = props;

    let formatDate = (data) => {
        let hoje = new Date();
        let dataFormatada = new Date(data);

        if (dataFormatada.toDateString() === hoje.toDateString()) return "Hoje";

        let amanha = new Date(hoje);
        amanha.setDate(hoje.getDate() + 1);
        if (dataFormatada.toDateString() === amanha.toDateString()) return "Amanhã";

        let ontem = new Date(hoje);
        ontem.setDate(hoje.getDate() - 1);
        if (dataFormatada.toDateString() === ontem.toDateString()) return "Ontem";

        return data.split("-").reverse().join("/");
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        {
                            tarefas.length == 0 &&
                            <p>Nenhuma tarefa cadastrada.</p>
                        }

                        {
                            tarefas.length > 0 &&
                            <table className="table-auto w-full text-left overflow-hidden shadow rounded-lg">
                                <thead>
                                    <tr className="bg-gray-500 text-gray-100 font-semibold">
                                        <th className="px-4 py-2">Nome</th>
                                        <th className="px-4 py-2">Etiqueta</th>
                                        <th className="px-4 py-2">Prazo</th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tarefas.map(tarefa => {
                                        return <tr key={tarefa.id}>
                                            <td className="px-4 py-2">{tarefa.nome}</td>
                                            <td className="px-4 py-2">{formatStatus(tarefa.status)}</td>
                                            <td className="px-4 py-2">{formatDate(tarefa.prazo)}</td>
                                            <td className="px-4 py-2 flex gap-2 justify-end">
                                                <PencilSimple size={32} weight="fill" />
                                                <Trash size={32} weight="fill" />
                                            </td>
                                        </tr>;
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function formatStatus(status) {
    let bg = "";

    if (status == "prioridade") bg = "bg-red-500";
    if (status == "secundario") bg = "bg-blue-500";
    if (status == "importante") bg = "bg-orange-500";
    if (status == "depois") bg = "bg-green-500";

    return <p className={`${bg} text-white text-center border rounded-full w-fit py-1 px-2`}>{capitalizeFirstLetter(status)}</p>;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}