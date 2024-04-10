import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PencilSimple, Trash } from '@phosphor-icons/react';
import { Inertia } from '@inertiajs/inertia';


export default function Dashboard(props) {
    let {tarefas} = props;

    let formatDate = (data) => {
        let hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        let dataFormatada = new Date(data);
        dataFormatada.setHours(0, 0, 0, 0);
        dataFormatada.setDate(dataFormatada.getDate() + 1);

        let diff = Math.floor((dataFormatada - hoje) / (1000 * 60 * 60 * 24));

        if (diff === 0) return "Hoje";
        else if (diff === 1) return "Amanhã";
        else if (diff === -1) return "Ontem";
        else return data.split("-").reverse().join("/");
    };

    let handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            Inertia.delete(route('delete-task', { id }), {
                onSuccess: () => {
                    Inertia.reload();
                },
            });
        }
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
                                                <PencilSimple
                                                    size={32}
                                                    weight="fill"
                                                    className="cursor-pointer"
                                                    title="Editar"
                                                    onClick={() => Inertia.get(route('edit-task', { id: tarefa.id }))}
                                                />
                                                <Trash
                                                    size={32}
                                                    weight="fill"
                                                    className="cursor-pointer"
                                                    title="Deletar"
                                                    onClick={() => handleDelete(tarefa.id)}
                                                />
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
